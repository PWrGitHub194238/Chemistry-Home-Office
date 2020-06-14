import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SentHomework } from "src/app/models";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class SentHomeworksInnerTableDataSource extends BaseTableDataSource<
  SentHomework
> {
  protected getData(): Observable<SentHomework[]> {
    return of(this.data);
  }

  filterPredicate = (data: SentHomework, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();
      result =
        result && this.sentHomeworkFilterPredicate(data, lowerCaseSearchKey);
    });

    return result;
  };

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
