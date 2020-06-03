import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTablePanelDataSource } from "../base-table-panel/base-table-panel.data-source";
import { SubjectDictEntry } from "src/app/core/models";

export class SubjectDictsDataSource extends BaseTablePanelDataSource<
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
