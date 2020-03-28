import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as Mail from "nodemailer/lib/mailer";
import {
  removeLocalAttachements,
  storeAttachementsLocally
} from "./attachements";
import { getHomeworkSentToTeacherNotificationOptions } from "./emails/homework-sent/to-teacher";
import {
  getHomeworkPaths,
  getSentHomework,
  getUserDetails
} from "./firestore-documents";
import { HomeworkPath } from "./models/homework-path.model";
import { SentHomework } from "./models/sent-homework.model";
import { sendMail } from "./emails/email";
import { getUserByEmail } from "./auth";
import { UserDetails } from "./models/user-details.model";
import { getHomeworkSentToTeacherConfirmationOptions } from "./emails/homework-sent/to-student";

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

  const assignments: string[] = homeworkPathDocument.assignments;
  const assignmentsCount: number = assignments.length;

  for (let i = 0; i < assignmentsCount; i += 1) {
    const assignment: string = assignments[i];

    const tempFilePaths: string[] = await storeAttachementsLocally(
      sentHomeworkDocument,
      assignment
    );

    if (tempFilePaths.length > 0) {
      const teacherNotificationOption: Mail.Options = await getHomeworkSentToTeacherNotificationOptions(
        sentHomeworkDocument,
        homeworkPathDocument,
        sender,
        senderDetails,
        tempFilePaths,
        assignment
      );

      const studentConfirmationOption: Mail.Options = await getHomeworkSentToTeacherConfirmationOptions(
        sentHomeworkDocument,
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
