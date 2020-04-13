import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { AssignmentDictEntry, MatIconDictEntry } from "src/app/core/models";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { HomeworkPathDialogComponent } from "../homework-path-dialog/homework-path-dialog.component";
import { HomeworkPathsDataSource } from "./homework-paths.data-source";
import { SnackBarService } from "src/app/core/services/snack-bar.service";

@UntilDestroy()
@Component({
  selector: "cho-homework-paths",
  templateUrl: "./homework-paths.component.html",
  styleUrls: ["./homework-paths.component.scss"]
})
export class HomeworkPathsComponent implements OnInit {
  columnsToDisplay = [
    "active",
    "date",
    "classNo",
    "topic",
    "assignments",
    "uid"
  ];

  loadingMessage = "temp";
  isLoading = false;
  homeworkPathSelected: HomeworkPath;
  dataSource = new HomeworkPathsDataSource(this.firestoreDocumentService);

  constructor(
    private route: ActivatedRoute,
    private firestoreDocumentService: FirestoreDocumentService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private assignmentsDict: AssignmentDictEntry[];
  private matIconsDict: MatIconDictEntry[];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadResolvedData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mouseEnter(homeworkPath: HomeworkPath) {
    this.homeworkPathSelected = homeworkPath;
  }

  mouseLeave() {
    this.homeworkPathSelected = null;
  }

  getSelectedHomeworkPathLink(homeworkPath: HomeworkPath): string {
    return homeworkPath
      ? `${location.origin}/send-homework/${homeworkPath.uid}`
      : "";
  }

  openAddHomeworkPathDialog() {
    this.matDialog.open(HomeworkPathDialogComponent, {
      height: "700px",
      width: "700px",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        homeworkPath: null,
        assignmentsDict: this.assignmentsDict,
        matIconsDict: this.matIconsDict
      }
    });
  }

  onSelectedHomeworkPathLinkCopied() {
    this.snackBarService.showOnSelectedHomeworkPathLinkCopied();
  }

  openEditHomeworkPathDialog(selectedHomeworkPath: HomeworkPath) {
    this.matDialog.open(HomeworkPathDialogComponent, {
      height: "700px",
      width: "700px",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        homeworkPath: selectedHomeworkPath,
        assignmentsDict: this.assignmentsDict,
        matIconsDict: this.matIconsDict
      }
    });
  }

  openDeleteHomeworkPathDialog(selectedHomeworkPath: HomeworkPath) {
    const alertData: AlertDialog = {
      title: "Usuwanie lekcji",
      body: `Czy na pewno chcesz usunąć lekcję '${selectedHomeworkPath.topic}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
    const dialogRef = this.matDialog.open(AlertDialogComponent, {
      data: alertData
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleteSelection: boolean) => {
        if (deleteSelection) {
          this.firestoreDocumentService.deleteHomeworkPath(
            selectedHomeworkPath
          );
        }
      });
  }

  private loadResolvedData() {
    this.assignmentsDict = this.route.snapshot.data["assignmentDict"];
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
  }
}
