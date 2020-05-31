import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Class } from "src/app/models";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { ClassDictDialogComponent } from "../class-dict-dialog/class-dict-dialog.component";
import { ClassDictsDataSource } from "./class-dict.data-source";

@Component({
  selector: "cho-class-dict",
  templateUrl: "./class-dict.component.html",
  styleUrls: ["./class-dict.component.scss"]
})
export class ClassDictComponent
  extends BaseTablePanelComponent<Class, ClassDictDialogComponent>
  implements OnInit {
  columnsToDisplay = ["classNo", "subclass", "studentCount", "uid"];
  addEditDialog = ClassDictDialogComponent;

  constructor(
    authService: AuthService,
    matDialog: MatDialog,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new ClassDictsDataSource(this.firestoreDocumentService);
  }

  getOnDeleteAlertDialogOptions(selectedRow: Class): AlertDialog {
    return {
      title: "Usuwanie klasy",
      body: `Czy na pewno chcesz usunąć klasę '${selectedRow.classNo}${selectedRow.subclass}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: Class) {
    this.firestoreDocumentService.deleteClass(selectedRow);
  }
}
