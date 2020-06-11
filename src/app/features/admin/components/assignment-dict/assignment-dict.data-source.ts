import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssignmentDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class AssignmentDictsDataSource extends BaseTableDataSource<
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
