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
import {
  createMatIcon,
  createUserRoles,
  deleteUserDetails,
  deleteUserRoles,
  getAllUserDetails,
  getAllUserRoles,
  getHomeworkPaths,
  getSentHomework,
  getUserDetails
} from "./firestore-documents";
import { HomeworkPath } from "./models/homework-path.model";
import { SentHomework } from "./models/sent-homework.model";
import { UserDetails } from "./models/user/user-details.model";
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
  const homeworkPathDocument: HomeworkPath = await getHomeworkPaths(
    sentHomeworkDocument.path_uid
  );

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
      uid: sentHomeworkDocument.uid,
      path_uid: sentHomeworkDocument.path_uid,
      email: sentHomeworkDocument.email,
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
      const users: admin.auth.ListUsersResult = await admin.auth().listUsers();
      const userDetails: UserDetails[] = await getAllUserDetails();
      const userRoles: UserRoles[] = await getAllUserRoles();

      const userUids: string[] = users.users.map(user => user.uid);
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

      users.users.forEach(async (user: admin.auth.UserRecord) => {
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
