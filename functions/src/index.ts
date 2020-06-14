import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as Mail from "nodemailer/lib/mailer";
import {
  removeLocalAttachements,
  storeAttachementsLocally
} from "./attachements";
import { getUserByEmail } from "./auth";
import { sendMail } from "./emails/email";
import { getHomeworkSentToTeacherConfirmationOptions } from "./emails/homework-sent/to-student";
import { getHomeworkSentToTeacherNotificationOptions } from "./emails/homework-sent/to-teacher";
import { sendResetPasswordMail } from "./emails/reset-password";
import { sendVerifyEmailMail } from "./emails/verify-email";
import {
  createUserRoles,
  deleteUserDetails,
  deleteUserRoles,
  getAllUserDetails,
  getAllUserRoles,
  getSentHomework,
  getUserDetails,
  getUserRoles
} from "./firestore-documents";
import { HomeworkPath } from "./models/homework-path.model";
import { SentHomework } from "./models/sent-homework.model";
import { UserDetails } from "./models/user/user-details.model";
import { UserDisplayDict } from "./models/user/user-display-dict.model";
import { UserRoles } from "./models/user/user-roles.model";

admin.initializeApp();

exports.sendHomeworkSentNotificationEmail = functions.https.onCall(
  async (data, context) => {
    try {
      const sentHomeworkDocument: SentHomework = await getSentHomework(
        data["uid"]
      );
      await sendNotificationEmails(sentHomeworkDocument);
      return { ...sentHomeworkDocument };
    } catch (err) {
      return { error: err };
    }
  }
);

async function sendNotificationEmails(sentHomeworkDocument: SentHomework) {
  const homeworkPathDocument: HomeworkPath = sentHomeworkDocument.homeworkPath;

  const sender: admin.auth.UserRecord = await getUserByEmail(
    sentHomeworkDocument.email
  );

  const senderDetails: UserDetails = await getUserDetails(sender.uid);

  const assignments: string[] = homeworkPathDocument.assignments.map(
    assignment => assignment.name
  );

  const assignmentsCount: number = assignments.length;
  for (let i = 0; i < assignmentsCount; i += 1) {
    const assignment: string = assignments[i];

    const tempFilePaths: string[] = await storeAttachementsLocally(
      sentHomeworkDocument,
      assignment
    );

    const assignmentSpecificPartialSentHomeworkDocument: SentHomework = {
      ...sentHomeworkDocument,
      files: sentHomeworkDocument.files.filter(
        file => file.assignment === assignment
      )
    };

    if (tempFilePaths.length > 0) {
      const teacherNotificationOption: Mail.Options = await getHomeworkSentToTeacherNotificationOptions(
        assignmentSpecificPartialSentHomeworkDocument,
        homeworkPathDocument,
        sender,
        senderDetails,
        tempFilePaths,
        assignment
      );

      const studentConfirmationOption: Mail.Options = await getHomeworkSentToTeacherConfirmationOptions(
        assignmentSpecificPartialSentHomeworkDocument,
        homeworkPathDocument,
        sender,
        senderDetails,
        tempFilePaths,
        assignment
      );

      await sendMail(teacherNotificationOption);

      await sendMail(studentConfirmationOption);

      removeLocalAttachements(tempFilePaths);
    }
  }
}

exports.cleanupCloudFirestore = functions.https.onCall(
  async (data, context) => {
    try {
      const adminUserRoles: UserRoles = await getUserRoles(data["uid"]);

      if (adminUserRoles.admin) {
        const userRecords: admin.auth.UserRecord[] = [];
        await listAllUsers(userRecords);

        const userDetails: UserDetails[] = await getAllUserDetails();
        const userRoles: UserRoles[] = await getAllUserRoles();

        const userUids: string[] = userRecords.map(user => user.uid);
        const userRoleUids: string[] = userRoles.map(userRole => userRole.uid);

        userDetails.forEach(async (userDetail: UserDetails) => {
          if (!userUids.includes(userDetail.uid)) {
            console.log(
              `No user connected to this user details. Deleting user detail: ${JSON.stringify(
                userDetail
              )}...`
            );
            await deleteUserDetails(userDetail.uid);
          }
        });

        userRoles.forEach(async (userRole: UserRoles) => {
          if (!userUids.includes(userRole.uid)) {
            console.log(
              `No user connected to this user role. Deleting user detail: ${JSON.stringify(
                userRole
              )}...`
            );
            await deleteUserRoles(userRole.uid);
          }
        });

        userRecords.forEach(async (user: admin.auth.UserRecord) => {
          if (!userRoleUids.includes(user.uid)) {
            console.log(
              `User ${JSON.stringify(
                user
              )} does not has role assigned. Creating user roles: ${JSON.stringify(
                {
                  uid: user.uid,
                  admin: false,
                  student: true
                }
              )}...`
            );
            await createUserRoles({
              uid: user.uid,
              admin: false,
              student: true
            });
          }
        });

        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      return { error: err };
    }
  }
);

exports.getUserData = functions.https.onCall(async (data, context) => {
  try {
    const user: admin.auth.UserRecord = await admin.auth().getUser(data["uid"]);
    return { ...user };
  } catch (err) {
    return { error: err };
  }
});

exports.updateUserData = functions.https.onCall(async (data, context) => {
  try {
    const userUid = data["update_uid"] as string;
    const adminUserRoles: UserRoles = await getUserRoles(data["uid"]);

    let userRecord: admin.auth.UserRecord;
    const userDetails: UserDetails = await getUserDetails(userUid);
    const userRoles: UserRoles = await getUserRoles(userUid);

    if (adminUserRoles.admin) {
      await admin.auth().updateUser(userUid, {
        disabled: data["disabled"] as boolean,
        displayName: data["displayName"] as string
      });
    }

    userRecord = await admin.auth().getUser(userUid);

    return {
      uid: userRecord.uid,
      disabled: userRecord.disabled,
      emailVerified: userRecord.emailVerified,
      photoURL: userRecord.photoURL as string,
      displayName: userRecord.displayName as string,
      details: userDetails,
      roles: userRoles
    };
  } catch (err) {
    return { error: err };
  }
});

exports.removeUserData = functions.https.onCall(async (data, context) => {
  try {
    const userUid = data["remove_uid"] as string;
    const adminUserRoles: UserRoles = await getUserRoles(data["uid"]);

    if (adminUserRoles.admin) {
      await admin.auth().deleteUser(userUid);
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { error: err };
  }
});

exports.resetUserPassword = functions.https.onCall(async (data, context) => {
  try {
    let user: admin.auth.UserRecord | null = null;

    if (data["uid"]) {
      user = await admin.auth().getUser(data["uid"]);
    } else if (data["email"]) {
      user = await admin.auth().getUserByEmail(data["email"]);
    }

    if (user) {
      await sendResetPasswordMail(
        user,
        await admin.auth().generatePasswordResetLink(user.email as string)
      );
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { error: err };
  }
});

exports.verifyUserEmail = functions.https.onCall(async (data, context) => {
  try {
    const user: admin.auth.UserRecord = await admin.auth().getUser(data["uid"]);

    await sendVerifyEmailMail(
      user,
      await admin.auth().generateEmailVerificationLink(user.email as string)
    );
    return { success: true };
  } catch (err) {
    return { error: err };
  }
});

exports.getUserAdminDetails = functions.https.onCall(async (data, context) => {
  try {
    const adminUserRoles: UserRoles = await getUserRoles(data["uid"]);
    const userDisplayArray: UserDisplayDict[] = [];

    if (adminUserRoles.admin) {
      const userRecords: admin.auth.UserRecord[] = [];

      await listAllUsers(userRecords);

      const userDetailsArray: UserDetails[] = await getAllUserDetails();
      const userRolesArray: UserRoles[] = await getAllUserRoles();

      userRecords.forEach((userRecord: admin.auth.UserRecord) => {
        const userDetails = userDetailsArray.find(
          (user: UserDetails) => user.uid === userRecord.uid
        );
        const userRoles = userRolesArray.find(
          (user: UserRoles) => user.uid === userRecord.uid
        );

        if (userDetails && userRoles) {
          userDisplayArray.push({
            uid: userRecord.uid,
            disabled: userRecord.disabled,
            emailVerified: userRecord.emailVerified,
            photoURL: userRecord.photoURL as string,
            displayName: userRecord.displayName as string,
            details: userDetails,
            roles: userRoles
          });
        }
      });
    } else {
      const userUid: string = data["uid"];
      const user: admin.auth.UserRecord = await admin.auth().getUser(userUid);
      const userDetails: UserDetails = await getUserDetails(userUid);
      const userRoles: UserRoles = await getUserRoles(userUid);

      userDisplayArray.push({
        uid: userUid,
        disabled: user.disabled,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL as string,
        displayName: user.displayName as string,
        details: userDetails,
        roles: userRoles
      });
    }

    return { userDisplayArray };
  } catch (err) {
    return { error: err };
  }
});

async function listAllUsers(
  users: admin.auth.UserRecord[],
  nextPageToken?: string
) {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then(async (listUsersResult: admin.auth.ListUsersResult) => {
      listUsersResult.users.forEach((userRecord: admin.auth.UserRecord) =>
        users.push(userRecord)
      );
      if (listUsersResult.pageToken) {
        // List next batch of users.
        await listAllUsers(users, listUsersResult.pageToken);
      }
    })
    .catch((error: any) => {
      throw new Error(`Error listing users: ${error}`);
    });
}

exports.sendEmail = functions.https.onCall(async (data, context) => {
  try {
    const adminUserRoles: UserRoles = await getUserRoles(data["uid"]);

    if (adminUserRoles.admin) {
      let toName = data["to_name"] as string;
      let toAddress = data["to_address"] as string;

      if (!toName || !toAddress) {
        const toUser: admin.auth.UserRecord = await admin
          .auth()
          .getUser(data["to_uid"]);
        toName = toUser.displayName ? toUser.displayName : toName;
        toAddress = toUser.email ? toUser.email : toAddress;
      }

      const mailDetails: Mail.Options = {
        from: {
          name: "Chemistry Home Office",
          address: "chemistry.home.office@gmail.com"
        },
        sender: {
          name: "Chemistry Home Office",
          address: "chemistry.home.office@gmail.com"
        },
        to: {
          name: toName,
          address: toAddress
        },
        subject: data["subject"] as string,
        html: data["html"] as string
      };

      await sendMail(mailDetails);

      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { error: err };
  }
});
