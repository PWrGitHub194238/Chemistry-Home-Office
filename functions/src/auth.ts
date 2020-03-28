import * as admin from "firebase-admin";

export async function getUserByEmail(
  email: string
): Promise<admin.auth.UserRecord> {
  const user: admin.auth.UserRecord = await admin.auth().getUserByEmail(email);

  if (!user) {
    throw new Error(
      `Couldn't find a user with the given e-mail address: '${email}'.`
    );
  }

  return user;
}
