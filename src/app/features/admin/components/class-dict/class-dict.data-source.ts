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
    const lowerCaseFilter = filter.toLowerCase();
    return (
      data.subclass.toLowerCase().includes(lowerCaseFilter) ||
      String(data.classNo).includes(lowerCaseFilter)
    );
  };
}
