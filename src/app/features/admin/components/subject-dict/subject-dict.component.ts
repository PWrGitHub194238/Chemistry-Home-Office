import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Subject } from "src/app/models";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { SubjectDictDialogComponent } from "../subject-dict-dialog/subject-dict-dialog.component";
import { SubjectDictsDataSource } from "./subject-dict.data-source";

@Component({
  selector: "cho-subject-dict",
  templateUrl: "./subject-dict.component.html",
  styleUrls: ["./subject-dict.component.scss"]
})
export class SubjectDictComponent
  extends BaseTablePanelComponent<Subject, SubjectDictDialogComponent>
  implements OnInit {
  columnsToDisplay = ["name", "uid"];
  addEditDialog = SubjectDictDialogComponent;

  constructor(
    authService: AuthService,
    matDialog: MatDialog,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new SubjectDictsDataSource(this.firestoreDocumentService);
  }

  getOnDeleteAlertDialogOptions(selectedRow: Subject): AlertDialog {
    return {
      title: "Usuwanie przedmiotu lecji",
      body: `Czy na pewno chcesz usunąć przedmiot lekcji '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: Subject) {
    this.firestoreDocumentService.deleteSubject(selectedRow);
  }
}
