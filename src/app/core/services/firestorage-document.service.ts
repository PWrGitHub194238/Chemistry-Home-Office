import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { forkJoin, Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { FileRowForm } from "src/app/features/admin/models/file-row-form.mode";
import { HomeworkPath, SentHomework, SentHomeworkFile } from "src/app/models";
import { AssignmentDictEntry, NOT_FOUND_ICON } from "../models";

@Injectable({
  providedIn: "root"
})
export class FirestorageDocumentService {
  constructor(private fireStorageService: AngularFireStorage) {}

  getFilesInfo$(
    homeworkPath: HomeworkPath,
    sendHomework: SentHomework
  ): Observable<FileRowForm[]> {
    return forkJoin(
      ...sendHomework.files.map((file: SentHomeworkFile) =>
        this.getFileInfo$(homeworkPath, file)
      )
    );
  }

  getFileInfo$(
    homeworkPath: HomeworkPath,
    file: SentHomeworkFile
  ): Observable<FileRowForm> {
    return zip(
      this.fireStorageService.ref(file.fullPath).getMetadata(),
      this.fireStorageService.ref(file.fullPath).getDownloadURL()
    ).pipe(
      map(([metadata, downloadUrl]) => {
        return {
          ...file,
          icon: this.getFileIcon(homeworkPath, file),
          contentType: metadata.contentType,
          downloadUrl
        };
      })
    );
  }

  private getFileIcon(
    homeworkPath: HomeworkPath,
    file: SentHomeworkFile
  ): string {
    const assignment = homeworkPath.assignments.find(
      (assignment: AssignmentDictEntry) => assignment.name === file.assignment
    );

    return assignment ? assignment.icon : NOT_FOUND_ICON;
  }
}
