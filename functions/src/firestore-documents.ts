import { SentHomework } from "./models/sent-homework.model";
import { HomeworkPath } from "./models/homework-path.model";
import * as admin from "firebase-admin";
import { UserDetails } from "./models/user-details.model";

export async function getSentHomework(uid: string): Promise<SentHomework> {
  const document = await getDocumentByUid("sent-homeworks", uid);
  return {
    uid: document.get("uid"),
    path_uid: document.get("path_uid"),
    email: document.get("email"),
    files: document.get("files")
  };
}

export async function getHomeworkPaths(uid: string): Promise<HomeworkPath> {
  const document = await getDocumentByUid("homework-paths", uid);
  return {
    uid: document.get("uid"),
    subject: document.get("subject"),
    class: document.get("class"),
    topic: document.get("topic"),
    assignments: document.get("assignments")
  };
}

export async function getUserDetails(uid: string): Promise<UserDetails> {
  const document = await getDocumentByUid("user-details", uid);
  return {
    studentClass: document.get("studentClass"),
    studentNo: document.get("studentNo")
  };
}

async function getDocumentByUid(
  collectionName: string,
  uid: string
): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
  const document = await admin
    .firestore()
    .collection(collectionName)
    .doc(uid)
    .get();

  if (!document.exists) {
    throw new Error(
      `Document of UID: '${uid}' does not exists in the '${collectionName}' collection.`
    );
  }

  return document;
}
