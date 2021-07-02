import * as admin from "firebase-admin";
import * as Mail from "nodemailer/lib/mailer";
import * as stringFormat from "string-format";
import { sendMail } from "./email";

export async function sendResetPasswordMail(
  user: admin.auth.UserRecord,
  resetPasswordToken: string
): Promise<void> {
  if (user.displayName && user.email) {
    const mailDetails: Mail.Options = {
      from: {
        name: "Chemistry Home Office DEV",
        address: "noreply@chemistry-home-office-dev.firebaseapp.com"
      },
      sender: {
        name: "Chemistry Home Office DEV",
        address: "noreply@chemistry-home-office-dev.firebaseapp.com"
      },
      to: {
        name: user.displayName,
        address: user.email
      },
      subject: "Zresetuj hasło do aplikacji",
      html: sendResetPasswordMailHtmlBody(user, resetPasswordToken)
    };

    await sendMail(mailDetails);
  }
}

function sendResetPasswordMailHtmlBody(
  user: admin.auth.UserRecord,
  resetPasswordToken: string
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
          <p>Kliknij <a href="{link}">ten</a> link, aby zresetować hasło aplikacji powiązane z Twoim kontem {mail}.</p>
          <p>Jeżeli nie prosiłeś o zresetowanie hasła, zignoruj tego e-maila.</p>
          <p>Proszę nie odpowiadaj na tę wiadomość.</p>
        </body>
      </html>`,
    {
      studentName: user.displayName ? user.displayName : user.email,
      mail: user.email,
      link: resetPasswordToken
    }
  );
}
