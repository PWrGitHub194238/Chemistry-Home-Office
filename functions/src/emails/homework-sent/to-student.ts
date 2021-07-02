import * as admin from "firebase-admin";
import * as Mail from "nodemailer/lib/mailer";
import * as stringFormat from "string-format";
import { SentHomework } from "../../models/sent-homework.model";
import { HomeworkPath } from "../../models/homework-path.model";
import { UserDetailsDictEntry } from "../../models/user/user-details-dict-entry.model";

export async function getHomeworkSentToTeacherConfirmationOptions(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  receiver: admin.auth.UserRecord,
  receiverDetails: UserDetailsDictEntry,
  tempFilePaths: string[],
  assignment: string
): Promise<Mail.Options> {
  if (receiver.email) {
    return {
      from: {
        name: "Chemistry Home Office",
        address: "chemistry.home.office@gmail.com"
      },
      sender: {
        name: "Chemistry Home Office",
        address: "chemistry.home.office@gmail.com"
      },
      to: {
        name: receiver.displayName ? receiver.displayName : receiver.email,
        address: receiver.email
      },
      replyTo: {
        name: "Chemistry Home Office",
        address: "chemistry.home.office@gmail.com"
      },
      subject: getSentToTeacherConfirmationSubject(
        homeworkPath,
        receiver,
        receiverDetails,
        assignment
      ),
      html: getSentToTeacherConfirmationHtmlBody(
        sentHomeworkDocument,
        homeworkPath,
        receiver,
        assignment
      ),
      attachments: await getSentToTeacherConfirmationAttachements(
        tempFilePaths,
        assignment
      )
    };
  }

  throw new Error(
    `Couldn't get an email of the receiver '${receiver.displayName}'`
  );
}

function getSentToTeacherConfirmationSubject(
  homeworkPath: HomeworkPath,
  receiver: admin.auth.UserRecord,
  receiverDetails: UserDetailsDictEntry,
  assignment: string
): string {
  return `[${homeworkPath.subject.name}][${receiverDetails.studentClass}][${
    homeworkPath.topic
  }][${receiverDetails.studentNo}][${
    receiver.displayName ? receiver.displayName : receiver.email
  }] ${assignment}`;
}

function getSentToTeacherConfirmationHtmlBody(
  sentHomeworkDocument: SentHomework,
  homeworkPath: HomeworkPath,
  receiver: admin.auth.UserRecord,
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
        <p>Cześć, {studentName}!</p>
        <p>To jest automatyczny mail informujący Cię o tym, które przesłane przez Ciebie materiały otrzymał Twój nauczyciel przedmiotu {subject} jako {assignment} na temat {topic}.</p>
        <p>Wysłane przez Ciebie dokumenty ({attachmentsCount}) znajdziesz w załącznikach.</p>
        <p>Proszę nie odpowiadaj na tę wiadomość.</p>
      </body>
    </html>`,
    {
      studentName:
        receiver.displayName && receiver.displayName.split(" ").length > 1
          ? receiver.displayName.split(" ")[0]
          : receiver.email,
      subject: homeworkPath.subject.name,
      assignment: assignment,
      topic: homeworkPath.topic,
      attachmentsCount: sentHomeworkDocument.files.filter(
        homeworkFile => homeworkFile.assignment === assignment
      ).length
    }
  );
}

async function getSentToTeacherConfirmationAttachements(
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
