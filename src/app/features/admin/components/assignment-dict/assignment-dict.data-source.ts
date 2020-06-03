import { Observable } from "rxjs";
import { AssignmentDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTablePanelDataSource } from "../base-table-panel/base-table-panel.data-source";

export class AssignmentDictsDataSource extends BaseTablePanelDataSource<
  AssignmentDictEntry
> {
  protected getData(): Observable<AssignmentDictEntry[]> {
    return this.firestoreDocumentService.getAllAssignments$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: AssignmentDictEntry, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      result =
        result && data.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    return result;
  };
}
