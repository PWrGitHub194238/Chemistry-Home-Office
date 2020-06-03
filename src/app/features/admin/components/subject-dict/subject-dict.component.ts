import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SubjectDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
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
  extends BaseTablePanelComponent<SubjectDictEntry, SubjectDictDialogComponent>
  implements OnInit {
  columnsToDisplay = ["name", "uid"];
  addEditDialog = SubjectDictDialogComponent;

  constructor(
    authService: AuthService,
    matDialog: MatDialog,
    private dictionaryService: DictionaryService,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new SubjectDictsDataSource(this.firestoreDocumentService);
  }

  getOnDeleteAlertDialogOptions(selectedRow: SubjectDictEntry): AlertDialog {
    return {
      title: "Usuwanie przedmiotu lecji",
      body: `Czy na pewno chcesz usunąć przedmiot lekcji '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: SubjectDictEntry) {
    this.dictionaryService.deleteSubject(selectedRow);
  }
}
