import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatIconDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { MatIconDictsDataSource } from "./mat-icon-dict.data-source";

@UntilDestroy()
@Component({
  selector: "cho-mat-icon-dict",
  templateUrl: "./mat-icon-dict.component.html",
  styleUrls: ["./mat-icon-dict.component.scss"]
})
export class MatIconDictComponent
  extends BaseTablePanelComponent<MatIconDictEntry, null>
  implements OnInit {
  columnsToDisplay = ["name"];
  addEditDialog = null;

  constructor(
    authService: AuthService,
    matDialog: MatDialog,
    private dictionaryService: DictionaryService,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new MatIconDictsDataSource(this.firestoreDocumentService);
  }

  mouseClick(matIcon: MatIconDictEntry) {
    this.dictionaryService
      .getAllActiveIcons$()
      .pipe(untilDestroyed(this))
      .subscribe((activeMatIcons: MatIconDictEntry[]) => {
        matIcon.active = !matIcon.active;
        if (matIcon.active) {
          this.dictionaryService.setAllActiveIcons$(matIcon, activeMatIcons);
        } else {
          this.dictionaryService.setAllActiveIcons$(
            matIcon,
            activeMatIcons.splice(
              activeMatIcons.findIndex(
                (icon: MatIconDictEntry) => icon.name === matIcon.name
              ),
              1
            )
          );
        }
      });
  }
}
