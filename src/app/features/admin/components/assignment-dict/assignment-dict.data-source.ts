import { Assignment } from "functions/src/models/assignment.model";
import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTablePanelDataSource } from "../base-table-panel/base-table-panel.data-source";

export class AssignmentDictsDataSource extends BaseTablePanelDataSource<
  Assignment
> {
  protected getData(): Observable<Assignment[]> {
    return this.firestoreDocumentService.getAllAssignments$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: Assignment, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      result =
        result && data.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    return result;
  };
}
