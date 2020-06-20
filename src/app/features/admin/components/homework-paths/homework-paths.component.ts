import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import {
  AssignmentDictEntry,
  MatIconDictEntry,
  SubjectDictEntry
} from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";
import { HomeworkPath } from "src/app/models";
import { getDate } from "src/app/shared/helpers/date.helper";
import { AlertDialog } from "src/app/shared/models";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { HomeworkPathsDialogComponent } from "../homework-paths-dialog/homework-paths-dialog.component";
import { HomeworkPathsDataSource } from "../homework-paths/homework-paths.data-source";

@Component({
  selector: "cho-homework-paths",
  templateUrl: "./homework-paths.component.html",
  styleUrls: ["./homework-paths.component.scss"]
})
export class HomeworkPathsComponent
  extends BaseTablePanelComponent<HomeworkPath, HomeworkPathsDialogComponent>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = [
    "active",
    "date",
    "classNo",
    // "subject",
    "topic",
    "assignments",
    "uid"
  ];

  viewDialog = HomeworkPathsDialogComponent;
  addDialog = HomeworkPathsDialogComponent;
  editDialog = HomeworkPathsDialogComponent;

  private assignmentsDict: AssignmentDictEntry[];
  private matIconsDict: MatIconDictEntry[];
  private subjectDict: SubjectDictEntry[];

  constructor(
    dataSource: HomeworkPathsDataSource,
    authService: AuthService,
    matDialog: MatDialog,
    private firestoreDocumentService: FirestoreDocumentService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {
    super(dataSource, authService, matDialog);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadResolvedData();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getViewDialogData() {
    return {
      assignmentsDict: this.assignmentsDict,
      matIconsDict: this.matIconsDict,
      subjectDict: this.subjectDict
    };
  }

  getAddDialogData() {
    return {
      assignmentsDict: this.assignmentsDict,
      matIconsDict: this.matIconsDict,
      subjectDict: this.subjectDict
    };
  }

  onItemAdded(addedItem: HomeworkPath) {
    this.dataSource.data.push(addedItem);
    super.onItemAdded(addedItem);
  }

  getEditDialogData() {
    return {
      assignmentsDict: this.assignmentsDict,
      matIconsDict: this.matIconsDict,
      subjectDict: this.subjectDict
    };
  }

  onItemEdited(editedItem?: HomeworkPath) {
    if (editedItem) {
      this.dataSource.data.splice(
        this.dataSource.data.findIndex(
          (item: HomeworkPath) => item.uid === editedItem.uid
        ),
        1,
        editedItem
      );
      super.onItemEdited(editedItem);
    }
  }

  getOnDeleteAlertDialogOptions(selectedRow: HomeworkPath): AlertDialog {
    return {
      title: "Usuwanie lekcji",
      body: `Czy na pewno chcesz usunąć lekcję '${selectedRow.topic}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onItemDeleted(deletedItem: HomeworkPath) {
    this.firestoreDocumentService.deleteHomeworkPath(deletedItem);
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (item: HomeworkPath) => item.uid === deletedItem.uid
      ),
      1
    );
    super.onItemDeleted(deletedItem);
  }

  getSelectedHomeworkPathLink(homeworkPath: HomeworkPath): string {
    return homeworkPath
      ? `${location.origin}/send-homework/${homeworkPath.uid}`
      : "";
  }

  onSelectedHomeworkPathLinkCopied() {
    this.snackBarService.showOnSelectedHomeworkPathLinkCopied();
  }

  getDate(date: Date | any) {
    return getDate(date);
  }

  private loadResolvedData() {
    this.assignmentsDict = this.route.snapshot.data["assignmentDict"];
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
    this.subjectDict = this.route.snapshot.data["subjectDict"];
  }
}
