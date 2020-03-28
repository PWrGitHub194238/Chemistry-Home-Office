import * as admin from "firebase-admin";
import * as Mail from "nodemailer/lib/mailer";
import * as stringFormat from "string-format";
import { SentHomework } from "../../models/sent-homework.model";
import { HomeworkPath } from "../../models/homework-path.model";
import { UserDetails } from "../../models/user-details.model";

export async function getHomeworkSentToTeacherNotificationOptions(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  sender: admin.auth.UserRecord,
  senderDetails: UserDetails,
  tempFilePaths: string[],
  assignment: string
): Promise<Mail.Options> {
  if (sender.email) {
    return {
      from: {
        name: sender.displayName ? sender.displayName : sender.email,
        address: sender.email
      },
      sender: {
        name: sender.displayName ? sender.displayName : sender.email,
        address: sender.email
      },
      to: {
        name: "Chemistry Home Office",
        address: "chemistry.home.office@gmail.com"
      },
      replyTo: {
        name: sender.displayName ? sender.displayName : sender.email,
        address: sender.email
      },
      subject: getTeacherNotificationSubject(
        homeworkPath,
        sender,
        senderDetails,
        assignment
      ),
      html: getTeacherNotificationHtmlBody(
        sentHomeworkDocument,
        homeworkPath,
        sender,
        senderDetails,
        assignment
      ),
      attachments: await getTeacherNotificationAttachements(
        tempFilePaths,
        assignment
      )
    };
  }

  throw new Error(
    `Couldn't get an email of the sender '${sender.displayName}'`
  );
}

function getTeacherNotificationSubject(
  homeworkPath: HomeworkPath,
  sender: admin.auth.UserRecord,
  senderDetails: UserDetails,
  assignment: string
): string {
  return `[${homeworkPath.subject}][${senderDetails.studentClass}][${
    homeworkPath.topic
  }][${senderDetails.studentNo}][${
    sender.displayName ? sender.displayName : sender.email
  }] ${assignment}`;
}

function getTeacherNotificationHtmlBody(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  sender: admin.auth.UserRecord,
  senderDetails: UserDetails,
  assignment: string
): string {
  return stringFormat(
    `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body bgcolor="#ffffff" text="#000000">
        <p>Cześć, Magdo!</p>
        <p>{studentName} z klasy {studentClass} o numerze {studentNo} w dzienniku właście wysłał do Ciebie zdjęcia/dokumenty dotyczące kategorii: '{assignment}'!</p>
        <p>Załączniki dotyczą lekcji {subject}, której tematem było {topic}.</p>
        <p>Wysłane przez ucznia dokumenty ({attachmentsCount}) znajdziesz w załącznikach.</p>
      </body>
    </html>`,
    {
      studentName: sender.displayName ? sender.displayName : sender.email,
      studentClass: senderDetails.studentClass,
      studentNo: senderDetails.studentNo,
      assignment: assignment,
      subject: homeworkPath.subject,
      topic: homeworkPath.topic,
      attachmentsCount: sentHomeworkDocument.files.filter(
        homeworkFile => homeworkFile.assignment === assignment
      ).length,
      studentEmail: sender.email
    }
  );
}

async function getTeacherNotificationAttachements(
  tempFilePaths: string[],
  assignment: string
): Promise<Mail.Attachment[]> {
  const attachements: Mail.Attachment[] = [];

  tempFilePaths.forEach((tempFilePath: string, i: number) => {
    attachements.push({
      path: tempFilePath,
      filename: `${assignment} ${i + 1}.${tempFilePath.split(".").pop()}`,
      contentDisposition: "attachment"
    });
  });

  return attachements;
}
