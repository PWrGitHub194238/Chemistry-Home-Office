import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { MatIcon, MAT_ICONS } from "src/app/models";
import { BaseTablePanelDataSource } from "../base-table-panel/base-table-panel.data-source";

export class MatIconDictsDataSource extends BaseTablePanelDataSource<MatIcon> {
  protected getData(): Observable<MatIcon[]> {
    return this.firestoreDocumentService.getAllActiveIcons$().pipe(
      map((activeIcons: MatIcon[]) =>
        MAT_ICONS.map((icon: MatIcon) => ({
          active: activeIcons.some(
            (activeIcon: MatIcon) => activeIcon.name === icon.name
          ),
          name: icon.name
        }))
      )
    );
  }

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  filterPredicate = (data: MatIcon, filter: string) => {
    const lowerCaseFilter = filter.toLowerCase();
    return data.name.toLowerCase().includes(lowerCaseFilter);
  };
}
