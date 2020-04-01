import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { Observable } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { HomeworkPathsDataSource } from "./homework-paths.data-source";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { HomeworkPathDialogComponent } from "../homework-path-dialog/homework-path-dialog.component";

@Component({
  selector: "cho-homework-paths",
  templateUrl: "./homework-paths.component.html",
  styleUrls: ["./homework-paths.component.scss"]
})
export class HomeworkPathsComponent implements OnInit {
  columnsToDisplay = ["active", "date", "class", "topic", "assignments", "uid"];

  loadingMessage = "temp";
  isLoading = false;
  homeworkPathSelected: HomeworkPath;
  dataSource = new HomeworkPathsDataSource(this.firestoreDocumentService);
  constructor(
    private firestoreDocumentService: FirestoreDocumentService,
    private matDialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mouseEnter(homeworkPath: HomeworkPath) {
    this.homeworkPathSelected = homeworkPath;
  }

  mouseLeave(homeworkPath: HomeworkPath) {
    this.homeworkPathSelected = null;
  }

  openAddHomeworkPathDialog() {
    const dialogRef = this.matDialog.open(HomeworkPathDialogComponent, {
      height: "500px",
      width: "700px",
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
