import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { MatIcon } from "src/app/models";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { MatIconDictsDataSource } from "./mat-icon-dict.data-source";

@Component({
  selector: "cho-mat-icon-dict",
  templateUrl: "./mat-icon-dict.component.html",
  styleUrls: ["./mat-icon-dict.component.scss"]
})
export class MatIconDictComponent extends BaseTablePanelComponent<MatIcon, null>
  implements OnInit {
  columnsToDisplay = ["name"];
  addEditDialog = null;

  constructor(
    authService: AuthService,
    matDialog: MatDialog,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new MatIconDictsDataSource(this.firestoreDocumentService);
  }

  mouseClick(matIcon: MatIcon) {
    matIcon.active = !matIcon.active;
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (icon: MatIcon) => icon.name === matIcon.name
      ),
      1,
      matIcon
    );
    this.firestoreDocumentService.setAllActiveIcons$(
      matIcon,
      this.dataSource.data.filter((icon: MatIcon) => icon.active)
    );
  }
}
