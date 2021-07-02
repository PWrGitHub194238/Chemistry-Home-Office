import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import { environment } from "../environments/environment.prod";

const transporter = nodemailer.createTransport({
  ...environment.nodeMailerAuth
});

export async function sendMail(mailDetails: Mail.Options): Promise<nodemailer.SentMessageInfo> {
  return await transporter.sendMail(mailDetails);
}
