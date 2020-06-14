import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AssignmentDictEntry, MatIconDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestorageDocumentService } from "src/app/core/services/firestorage-document.service";
import { HomeworkPath, SentHomework, SentHomeworkFile } from "src/app/models";
import { getDate } from "src/app/shared/helpers/date.helper";
import { FileRowForm } from "../../models";
import { SentHomeworksForPath } from "../../models/sent-homeworks-for-path.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { HomeworkPathsDialogComponent } from "../homework-paths-dialog/homework-paths-dialog.component";
import { SentHomeworksDataSource } from "./sent-homeworks.data-source";

@UntilDestroy()
@Component({
  selector: "cho-sent-homeworks",
  templateUrl: "./sent-homeworks.component.html",
  styleUrls: ["./sent-homeworks.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class SentHomeworksComponent
  extends BaseTablePanelComponent<SentHomeworksForPath, null>
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

  expandedItem: SentHomeworksForPath;
  selectedFileForGallery: FileRowForm | undefined = undefined;

  private assignmentsDict: AssignmentDictEntry[];
  private matIconsDict: MatIconDictEntry[];

  constructor(
    private firestorageDocumentService: FirestorageDocumentService,
    dataSource: SentHomeworksDataSource,
    authService: AuthService,
    matDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    super(dataSource, authService, matDialog);
  }

  ngOnInit() {
    this.selectedFileForGallery = undefined;
    super.ngOnInit();
    this.loadResolvedData();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.sort.sortChange
      .pipe(untilDestroyed(this))
      .subscribe(_ => (this.expandedItem = null));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  isExpanded(row: SentHomeworksForPath) {
    return row === this.expandedItem;
  }

  openViewSelectedItemDialog(selectedRow: SentHomeworksForPath) {
    this.matDialog.open(HomeworkPathsDialogComponent, {
      height: "auto",
      width: "auto",
      data: {
        selectedRow: selectedRow as HomeworkPath,
        assignmentsDict: this.assignmentsDict,
        matIconsDict: this.matIconsDict,
        viewMode: true
      }
    });
  }

  openGalleryForFile(event: {
    sentHomework: SentHomework;
    file: SentHomeworkFile;
    index: number;
  }) {
    this.firestorageDocumentService
      .getFileInfo$(this.expandedItem, event.file)
      .pipe(untilDestroyed(this))
      .subscribe((fileRows: FileRowForm) => {
        this.selectedFileForGallery = {
          ...fileRows,
          sentHomeworkRef: event.sentHomework,
          statusFormIdx: event.index
        };
      });
  }

  onGalleryClosed() {
    this.selectedFileForGallery = undefined;
  }

  getDate(date: Date | any) {
    return getDate(date);
  }

  private loadResolvedData() {
    this.assignmentsDict = this.route.snapshot.data["assignmentDict"];
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
  }
}
