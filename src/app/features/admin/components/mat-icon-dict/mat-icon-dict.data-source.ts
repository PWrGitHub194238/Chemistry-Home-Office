import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatIconDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class MatIconDictsDataSource extends BaseTableDataSource<
  MatIconDictEntry
> {
  protected getData(): Observable<MatIconDictEntry[]> {
    return this.firestoreDocumentService.getAllIcons$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: MatIconDictEntry, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      result =
        result && data.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    return result;
  };
}
