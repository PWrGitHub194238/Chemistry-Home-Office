import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubjectDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class SubjectDictsDataSource extends BaseTableDataSource<
  SubjectDictEntry
> {
  protected getData(): Observable<SubjectDictEntry[]> {
    return this.firestoreDocumentService.getAllSubjects$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: SubjectDictEntry, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      result =
        result && data.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    return result;
  };
}
