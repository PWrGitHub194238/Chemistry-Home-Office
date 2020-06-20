import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { SentHomework } from "src/app/models";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";
import { SentHomeworksForPath } from "../../models";

@Injectable({
  providedIn: "root"
})
export class SentHomeworksDataSource extends BaseTableDataSource<
  SentHomeworksForPath
> {
  protected getData(): Observable<SentHomeworksForPath[]> {
    return this.firestoreDocumentService.getAllSentHomeworksForPaths$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: SentHomeworksForPath, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();

      if (
        this.sentHomeworksFilterPredicate(
          data.sentHomeworks,
          lowerCaseSearchKey
        )
      ) {
        result = true;
      } else {
        result =
          result && this.homeworkPathFilterPredicate(data, lowerCaseSearchKey);
      }
    });

    return result;
  };

  private homeworkPathFilterPredicate(
    data: SentHomeworksForPath,
    lowerCaseSearchKey: string
  ): boolean {
    return isNaN(Number(lowerCaseSearchKey))
      ? data.topic.toLowerCase().includes(lowerCaseSearchKey) ||
          data.assignments.some(assignment =>
            assignment.name.toLowerCase().includes(lowerCaseSearchKey)
          )
      : data.classNo === Number(lowerCaseSearchKey);
  }

  private sentHomeworksFilterPredicate(
    data: SentHomework[],
    lowerCaseSearchKey: string
  ): boolean {
    return data.some((sentHomework: SentHomework) =>
      this.sentHomeworkFilterPredicate(sentHomework, lowerCaseSearchKey)
    );
  }

  private sentHomeworkFilterPredicate(
    data: SentHomework,
    lowerCaseSearchKey: string
  ): boolean {
    return isNaN(Number(lowerCaseSearchKey))
      ? data.displayName.toLowerCase().includes(lowerCaseSearchKey) ||
          data.userDetails.studentClass.toLowerCase() === lowerCaseSearchKey
      : data.userDetails.studentNo === Number(lowerCaseSearchKey);
  }
}
