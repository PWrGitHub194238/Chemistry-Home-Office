import * as admin from "firebase-admin";
import { HomeworkPath } from "./models/homework-path.model";
import { SentHomework } from "./models/sent-homework.model";
import { UserDetailsDictEntry } from "./models/user/user-details-dict-entry.model";
import { UserRolesDictEntry } from "./models/user/user-roles-dict-entry.model";
import { SubjectDictEntry } from "./models/dictionaries/subject-dict-entry.model";

export async function getAllSentHomeworks(): Promise<SentHomework[]> {
  const sentHomeworks: SentHomework[] = [];
  const snapshot = await admin
    .firestore()
    .collection("sent-homeworks")
    .get();

  snapshot.forEach(document => {
    sentHomeworks.push(getSentHomeworkFromDocument(document));
  });

  return sentHomeworks;
}

export async function getSentHomework(uid: string): Promise<SentHomework> {
  const document = await getDocumentByUid("sent-homeworks", uid);

  return getSentHomeworkFromDocument(document);
}

export async function deleteSentHomework(
  uid: string
): Promise<FirebaseFirestore.WriteResult> {
  return await deleteDocumentByUid("sent-homeworks", uid);
}

export async function getAllHomeworkPaths(): Promise<HomeworkPath[]> {
  const homeworkPaths: HomeworkPath[] = [];
  const snapshot = await admin
    .firestore()
    .collection("homework-paths")
    .get();

  snapshot.forEach(document => {
    homeworkPaths.push(getHomeworkPathFromDocument(document));
  });

  return homeworkPaths;
}

export async function getHomeworkPath(uid: string): Promise<HomeworkPath> {
  const document = await getDocumentByUid("homework-paths", uid);

  return getHomeworkPathFromDocument(document);
}

export async function getSubject(uid: string): Promise<SubjectDictEntry> {
  const document = await getDocumentByUid("subject-dict", uid);

  return {
    uid: document.get("uid"),
    name: document.get("name"),
    teacherEmail: document.get("teacherEmail")
  };
}

export async function getAllUserDetails(): Promise<UserDetailsDictEntry[]> {
  const userDetails: UserDetailsDictEntry[] = [];
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

export async function getUserDetails(
  uid: string
): Promise<UserDetailsDictEntry> {
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

export async function getAllUserRoles(): Promise<UserRolesDictEntry[]> {
  const userRoles: UserRolesDictEntry[] = [];
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

export async function getUserRoles(uid: string): Promise<UserRolesDictEntry> {
  const document = await getDocumentByUid("user-roles", uid);
  return {
    uid: document.get("uid"),
    admin: document.get("admin"),
    student: document.get("student")
  };
}

export async function createUserRoles(
  userRoles: UserRolesDictEntry
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

function getSentHomeworkFromDocument(
  document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): SentHomework {
  return {
    uid: document.get("uid"),
    email: document.get("email"),
    displayName: document.get("displayName"),
    userDetails: document.get("userDetails"),
    files: document.get("files"),
    date: document.get("date"),
    homeworkPath: document.get("homeworkPath")
  };
}

function getHomeworkPathFromDocument(
  document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): HomeworkPath {
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
