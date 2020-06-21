import * as admin from "firebase-admin";
import * as Mail from "nodemailer/lib/mailer";
import * as stringFormat from "string-format";
import { sendMail } from "./email";
import { UserDetailsDictEntry } from "../models/user/user-details-dict-entry.model";

export async function sendVerifyNewAccountMail(
  user: admin.auth.UserRecord,
  userDetails: UserDetailsDictEntry,
  verifyLinkToken: string
): Promise<void> {
  if (user.displayName && user.email) {
    const mailDetails: Mail.Options = {
      from: {
        name: "Chemistry Home Office",
        address: "noreply@chemistry-home-office.firebaseapp.com"
      },
      sender: {
        name: "Chemistry Home Office",
        address: "noreply@chemistry-home-office.firebaseapp.com"
      },
      to: {
        name: "Chemistry Home Office",
        address: "chemistry.home.office@gmail.com"
      },
      subject: `Aktywuj konto dla ${
        user.displayName ? user.displayName : user.email
      }!`,
      html: sendVerifyNewAccountMailHtmlBody(user, userDetails, verifyLinkToken)
    };

    await sendMail(mailDetails);
  }
}

function sendVerifyNewAccountMailHtmlBody(
  user: admin.auth.UserRecord,
  userDetails: UserDetailsDictEntry,
  verifyLinkToken: string
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
          <p>Cześć!</p>
          <p>Uczeń klasy {studentClass} o numerze w dzienniku {studentNo} ({studentName}) właśnie się zarejestrował przy użyciu adresu e-mail: {studentEmail}.</p>
          <p>Kliknij <a href="{link}">ten</a> link, aby zweryfikować ten adres e-mail.</p>
          <p>Dopóki adres e-mail nie zostanie przez Ciebie zweryfikowany, użytkownik nie będzie mógł zalogować się do systemu.</p>
          <p>Proszę nie odpowiadaj na tę wiadomość.</p>
        </body>
      </html>`,
    {
      studentClass: userDetails.studentClass,
      studentNo: userDetails.studentNo,
      studentName: user.displayName ? user.displayName : user.email,
      studentEmail: user.email,
      link: verifyLinkToken
    }
  );
}
