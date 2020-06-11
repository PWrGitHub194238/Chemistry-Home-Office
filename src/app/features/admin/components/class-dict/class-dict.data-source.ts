import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class ClassDictsDataSource extends BaseTableDataSource<ClassDictEntry> {
  protected getData(): Observable<ClassDictEntry[]> {
    return this.firestoreDocumentService.getAllClasses$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: ClassDictEntry, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();
      result =
        (result && data.subclass.toLowerCase().includes(lowerCaseSearchKey)) ||
        String(data.classNo).includes(lowerCaseSearchKey);
    });

    return result;
  };
}
