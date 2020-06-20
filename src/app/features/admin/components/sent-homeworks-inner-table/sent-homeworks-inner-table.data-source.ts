import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SentHomework, HomeworkPath } from "src/app/models";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";
import { SentHomeworksForPath } from "../../models";

@Injectable({
  providedIn: "root"
})
export class SentHomeworksInnerTableDataSource extends BaseTableDataSource<
  SentHomework
> {
  homeworkPath: SentHomeworksForPath;

  protected getData(): Observable<SentHomework[]> {
    return of(this.data);
  }

  filterPredicate = (data: SentHomework, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();
      result =
        (result &&
          this.homeworkPathFilterPredicate(
            this.homeworkPath,
            lowerCaseSearchKey
          )) ||
        this.sentHomeworkFilterPredicate(data, lowerCaseSearchKey);
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
