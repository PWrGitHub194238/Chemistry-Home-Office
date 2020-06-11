import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { HomeworkPath } from "src/app/models";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class HomeworkPathsDataSource extends BaseTableDataSource<HomeworkPath> {
  protected getData(): Observable<HomeworkPath[]> {
    return this.firestoreDocumentService.getAllHomeworkPaths$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: HomeworkPath, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();
      result =
        result && isNaN(Number(lowerCaseSearchKey))
          ? data.topic.toLowerCase().includes(lowerCaseSearchKey) ||
            data.assignments.some(assignment =>
              assignment.name.toLowerCase().includes(lowerCaseSearchKey)
            )
          : data.classNo === Number(lowerCaseSearchKey);
    });

    return result;
  };
}
