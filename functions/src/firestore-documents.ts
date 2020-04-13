import * as admin from "firebase-admin";
import { HomeworkPath } from "./models/homework-path.model";
import { MatIconDictEntry } from "./models/mat-icon-dict-entry.model";
import { SentHomework } from "./models/sent-homework.model";
import { UserDetails } from "./models/user/user-details.model";
import { UserRoles } from "./models/user/user-roles.model";

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
    active: document.get("active"),
    date: document.get("date"),
    subject: document.get("subject"),
    classNo: document.get("classNo"),
    topic: document.get("topic"),
    assignments: document.get("assignments")
  };
}

export async function getAllUserDetails(): Promise<UserDetails[]> {
  const userDetails: UserDetails[] = [];
  const snapshot = await admin
    .firestore()
    .collection("user-details")
    .get();

  snapshot.forEach(document => {
    userDetails.push({
      uid: document.get("uid"),
      studentClass: document.get("studentClass"),
      studentNo: document.get("studentNo")
    });
  });

  return userDetails;
}

export async function getUserDetails(uid: string): Promise<UserDetails> {
  const document = await getDocumentByUid("user-details", uid);
  return {
    uid: document.get("uid"),
    studentClass: document.get("studentClass"),
    studentNo: document.get("studentNo")
  };
}

export async function deleteUserDetails(
  uid: string
): Promise<FirebaseFirestore.WriteResult> {
  return await deleteDocumentByUid("user-details", uid);
}

export async function getAllUserRoles(): Promise<UserRoles[]> {
  const userRoles: UserRoles[] = [];
  const snapshot = await admin
    .firestore()
    .collection("user-roles")
    .get();

  snapshot.forEach(document => {
    userRoles.push({
      uid: document.get("uid"),
      admin: document.get("admin"),
      student: document.get("student")
    });
  });

  return userRoles;
}

export async function getUserRoles(uid: string): Promise<UserRoles> {
  const document = await getDocumentByUid("user-roles", uid);
  return {
    uid: document.get("uid"),
    admin: document.get("admin"),
    student: document.get("student")
  };
}

export async function createUserRoles(
  userRoles: UserRoles
): Promise<FirebaseFirestore.WriteResult> {
  return await admin
    .firestore()
    .collection("user-roles")
    .doc(userRoles.uid)
    .set(userRoles);
}

export async function deleteUserRoles(
  uid: string
): Promise<FirebaseFirestore.WriteResult> {
  return await deleteDocumentByUid("user-roles", uid);
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

async function deleteDocumentByUid(
  collectionName: string,
  uid: string
): Promise<FirebaseFirestore.WriteResult> {
  return await admin
    .firestore()
    .collection(collectionName)
    .doc(uid)
    .delete();
}

export async function createMatIcon(
  matIcon: MatIconDictEntry
): Promise<FirebaseFirestore.WriteResult> {
  return await admin
    .firestore()
    .collection("mat-icon-dict")
    .doc(matIcon.name)
    .set(matIcon);
}
