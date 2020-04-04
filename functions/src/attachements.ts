import * as admin from "firebase-admin";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { SentHomeworkFile } from "./models/sent-homework-file.model";
import { SentHomework } from "./models/sent-homework.model";

export async function storeAttachementsLocally(
  sentHomeworkDocument: SentHomework,
  assignment: string
): Promise<string[]> {
  const tempFilePaths: string[] = [];
  const filePaths: SentHomeworkFile[] = sentHomeworkDocument.files.filter(
    homeworkFile => homeworkFile.assignment === assignment
  );
  const filePathCount: number = filePaths.length;

  for (let i = 0; i < filePathCount; i += 1) {
    tempFilePaths.push(await storeAttachementLocally(filePaths[i].fullPath));
  }

  return tempFilePaths;
}

async function storeAttachementLocally(fullPath: string) {
  const bucket = admin.storage().bucket();
  const fileName = fullPath.split("/").pop();

  if (fileName) {
    const tempFilePath = path.join(os.tmpdir(), fileName);
    await bucket.file(fullPath).download({ destination: tempFilePath });
    return tempFilePath;
  } else {
    throw new Error(
      `Couldn't get file name for the file with full path '${fullPath}'`
    );
  }
}

export function removeLocalAttachements(tempFilePaths: string[]) {
  tempFilePaths.forEach(async tempPath => {
    fs.unlinkSync(tempPath);
  });
}
