import * as admin from "firebase-admin";
import * as Mail from "nodemailer/lib/mailer";
import * as stringFormat from "string-format";
import { HomeworkPath } from "../../models/homework-path.model";
import { SentHomeworkFile } from "../../models/sent-homework-file.model";
import { SentHomework } from "../../models/sent-homework.model";
import { UserDetailsDictEntry } from "../../models/user/user-details-dict-entry.model";
const TableBuilder = require("table-builder");

export async function getHomeworkSentToTeacherNotificationOptions(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  sender: admin.auth.UserRecord,
  senderDetails: UserDetailsDictEntry,
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
        sentHomeworkDocument.files,
        tempFilePaths
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
  senderDetails: UserDetailsDictEntry,
  assignment: string
): string {
  return `[${homeworkPath.subject.name}][${senderDetails.studentClass}][${
    homeworkPath.topic
  }][${senderDetails.studentNo}][${
    sender.displayName ? sender.displayName : sender.email
  }] ${assignment}`;
}

function getTeacherNotificationHtmlBody(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  sender: admin.auth.UserRecord,
  senderDetails: UserDetailsDictEntry,
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
        {filesAdditionalDescription}
      </body>
    </html>`,
    {
      studentName: sender.displayName ? sender.displayName : sender.email,
      studentClass: senderDetails.studentClass,
      studentNo: senderDetails.studentNo,
      assignment: assignment,
      subject: homeworkPath.subject.name,
      topic: homeworkPath.topic,
      attachmentsCount: sentHomeworkDocument.files.length,
      studentEmail: sender.email,
      filesAdditionalDescription: getTeacherNotificationHtmlBodyFilesAdditionalDescription(
        sender.displayName ? sender.displayName : sender.email,
        sentHomeworkDocument.files
      )
    }
  );
}

function getTeacherNotificationHtmlBodyFilesAdditionalDescription(
  studentName: string | undefined,
  sentHomeworkFiles: SentHomeworkFile[]
): string {
  if (sentHomeworkFiles.some(file => file.description)) {
    return stringFormat(
      `
        <br />
        <br />
        Dodatkowo {studentName} zamieścił następujące komentarze do przesłanych przez siebie plików:<br />
      {htmlTable}.
    `,
      {
        studentName: studentName,
        htmlTable: new TableBuilder({})
          .setHeaders({
            name: "Nazwa pliku",
            description: "Komentarz do pliku"
          })
          .setData(
            sentHomeworkFiles.map((file: SentHomeworkFile) => ({
              name: file.fileName,
              description: file.description
            }))
          )
          .render()
      }
    );
  }

  return "";
}

async function getTeacherNotificationAttachements(
  sentHomeworkFiles: SentHomeworkFile[],
  tempFilePaths: string[]
): Promise<Mail.Attachment[]> {
  const attachements: Mail.Attachment[] = [];

  tempFilePaths.forEach((tempFilePath: string, i: number) => {
    attachements.push({
      path: tempFilePath,
      filename: `${sentHomeworkFiles[i].fileName}.${tempFilePath
        .split(".")
        .pop()}`,
      contentDisposition: "attachment"
    });
  });

  return attachements;
}
