import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Class } from "src/app/models/class.model";
import { BaseTablePanelDataSource } from "../base-table-panel/base-table-panel.data-source";

export class ClassDictsDataSource extends BaseTablePanelDataSource<Class> {
  protected getData(): Observable<Class[]> {
    return this.firestoreDocumentService.getAllClasses$();
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: Class, filter: string) => {
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
