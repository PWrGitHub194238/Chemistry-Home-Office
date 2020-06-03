import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { MatIconDictEntry } from "functions/src/models/mat-icon-dict-entry.model";
import { AssignmentDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { AssignmentDictDialogComponent } from "../assignment-dict-dialog/assignment-dict-dialog.component";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { AssignmentDictsDataSource } from "./assignment-dict.data-source";

@Component({
  selector: "cho-assignment-dict",
  templateUrl: "./assignment-dict.component.html",
  styleUrls: ["./assignment-dict.component.scss"]
})
export class AssignmentDictComponent
  extends BaseTablePanelComponent<
    AssignmentDictEntry,
    AssignmentDictDialogComponent
  >
  implements OnInit {
  columnsToDisplay = ["name", "icon", "uid"];
  addEditDialog = AssignmentDictDialogComponent;

  private matIconsDict: MatIconDictEntry[];

  constructor(
    private route: ActivatedRoute,
    authService: AuthService,
    matDialog: MatDialog,
    private dictionaryService: DictionaryService,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new AssignmentDictsDataSource(
      this.firestoreDocumentService
    );

    this.loadResolvedData();
  }

  getAddDialogData() {
    return {
      matIconsDict: this.matIconsDict
    };
  }

  getEditDialogData() {
    return {
      matIconsDict: this.matIconsDict
    };
  }

  getOnDeleteAlertDialogOptions(selectedRow: AssignmentDictEntry): AlertDialog {
    return {
      title: "Usuwanie zadania",
      body: `Czy na pewno chcesz usunąć zadanie '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: AssignmentDictEntry) {
    this.dictionaryService.deleteAssignment(selectedRow);
  }

  loadResolvedData() {
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
  }
}
