import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AssignmentDictEntry, MatIconDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";
import { HomeworkPath } from "src/app/models";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { HomeworkPathDialogComponent } from "../homework-path-dialog/homework-path-dialog.component";
import { HomeworkPathsDataSource } from "../homework-paths/homework-paths.data-source";

@Component({
  selector: "cho-homework-paths",
  templateUrl: "./homework-paths.component.html",
  styleUrls: ["./homework-paths.component.scss"]
})
export class HomeworkPathsComponent
  extends BaseTablePanelComponent<HomeworkPath, HomeworkPathDialogComponent>
  implements OnInit {
  columnsToDisplay = [
    "active",
    "date",
    "classNo",
    // "subject",
    "topic",
    "assignments",
    "uid"
  ];
  addEditDialog = HomeworkPathDialogComponent;

  private assignmentsDict: AssignmentDictEntry[];
  private matIconsDict: MatIconDictEntry[];

  constructor(
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    authService: AuthService,
    matDialog: MatDialog,
    private firestoreDocumentService: FirestoreDocumentService
  ) {
    super(authService, matDialog);
  }

  ngOnInit() {
    this.dataSource = new HomeworkPathsDataSource(
      this.firestoreDocumentService
    );

    this.loadResolvedData();
  }

  getAddDialogData() {
    return {
      assignmentsDict: this.assignmentsDict,
      matIconsDict: this.matIconsDict
    };
  }

  getEditDialogData() {
    return {
      assignmentsDict: this.assignmentsDict,
      matIconsDict: this.matIconsDict
    };
  }

  getOnDeleteAlertDialogOptions(selectedRow: HomeworkPath): AlertDialog {
    return {
      title: "Usuwanie lekcji",
      body: `Czy na pewno chcesz usunąć lekcję '${selectedRow.topic}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: HomeworkPath) {
    this.firestoreDocumentService.deleteHomeworkPath(selectedRow);
  }

  getSelectedHomeworkPathLink(homeworkPath: HomeworkPath): string {
    return homeworkPath
      ? `${location.origin}/send-homework/${homeworkPath.uid}`
      : "";
  }

  onSelectedHomeworkPathLinkCopied() {
    this.snackBarService.showOnSelectedHomeworkPathLinkCopied();
  }

  private loadResolvedData() {
    this.assignmentsDict = this.route.snapshot.data["assignmentDict"];
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
  }
}
