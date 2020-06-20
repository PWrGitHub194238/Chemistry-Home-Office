import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AssignmentDictEntry, NOT_FOUND_ICON } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestorageDocumentService } from "src/app/core/services/firestorage-document.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import {
  HomeworkPath,
  SentHomework,
  SentHomeworkFile,
  TaskStatus,
  taskStatusToClass,
  taskStatusToColor,
  taskStatusToString
} from "src/app/models";
import { getDate } from "src/app/shared/helpers/date.helper";
import { FileRowForm } from "../../models/file-row-form.mode";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { SentHomeworksInnerTableDialogComponent } from "../sent-homeworks-inner-table-dialog/sent-homeworks-inner-table-dialog.component";
import { SentHomeworksInnerTableDataSource } from "./sent-homeworks-inner-table.data-source";
import { SentHomeworksForPath } from "../../models";

@UntilDestroy()
@Component({
  selector: "cho-sent-homeworks-inner-table",
  templateUrl: "./sent-homeworks-inner-table.component.html",
  styleUrls: ["./sent-homeworks-inner-table.component.scss"],
  providers: [SentHomeworksInnerTableDataSource]
})
export class SentHomeworksInnerTableComponent
  extends BaseTablePanelComponent<
    SentHomework,
    SentHomeworksInnerTableDialogComponent
  >
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() homeworkPath: SentHomeworksForPath;
  @Input() data: SentHomework[] = [];
  @Input() filter: string;
  @Output() onOpenGalleryForFile = new EventEmitter<{
    sentHomework: SentHomework;
    file: SentHomeworkFile;
    index: number;
  }>();

  columnsToDisplay = [
    "displayName",
    "studentClass",
    "studentNo",
    "date",
    "files",
    "uid"
  ];

  editDialog = SentHomeworksInnerTableDialogComponent;

  constructor(
    private firestoreDocumentService: FirestoreDocumentService,
    private firestorageDocumentService: FirestorageDocumentService,
    dataSource: SentHomeworksInnerTableDataSource,
    authService: AuthService,
    matDialog: MatDialog
  ) {
    super(dataSource, authService, matDialog);
  }

  ngOnInit() {
    this.dataSource.data = this.data;
    (<SentHomeworksInnerTableDataSource>(
      this.dataSource
    )).homeworkPath = this.homeworkPath;
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.dataSource.filter = changes.filter.currentValue;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  openEditSelectedItemDialog(selectedRow: SentHomework) {
    this.firestorageDocumentService
      .getFilesInfo$(this.homeworkPath, selectedRow)
      .pipe(untilDestroyed(this))
      .subscribe((fileRows: FileRowForm[]) => {
        const matDialogRef = this.matDialog.open(this.editDialog, {
          height: "auto",
          width: "auto",
          disableClose: true,
          closeOnNavigation: false,
          data: {
            selectedRow,
            homeworkPath: this.homeworkPath,
            fileRows: fileRows
          }
        });

        matDialogRef
          .afterClosed()
          .pipe(untilDestroyed(this))
          .subscribe((editedItem: SentHomework) => {
            if (editedItem) {
              selectedRow.files.forEach(
                (file: SentHomeworkFile, index: number) => {
                  file.status = editedItem.files[index].status;
                }
              );
            }
          });
      });
  }

  getFileTooltip(file: SentHomeworkFile): string {
    return `Nazwa pliku: ${
      file.fileName ? file.fileName : "nie podano"
    }\nOpis pliku: ${
      file.description ? file.description : "nie podano"
    }\nStatus: ${taskStatusToString.get(file.status)}`;
  }

  isFileAccepted(file: SentHomeworkFile) {
    return file.status === TaskStatus.Accepted;
  }

  getFileIconClass(file: SentHomeworkFile): string {
    return `small-action-button ${taskStatusToClass.get(file.status)}`;
  }

  getFileIconColor(file: SentHomeworkFile) {
    return taskStatusToColor.get(file.status);
  }

  openGalleryForFile(
    sentHomework: SentHomework,
    file: SentHomeworkFile,
    index: number
  ) {
    this.onOpenGalleryForFile.emit({
      sentHomework,
      file,
      index
    });
  }

  getFileAssignmentIcon(row: SentHomework, file: SentHomeworkFile) {
    const assignmentDef: AssignmentDictEntry = row.homeworkPath.assignments.find(
      (assignment: AssignmentDictEntry) => assignment.name === file.assignment
    );

    return assignmentDef ? assignmentDef.icon : NOT_FOUND_ICON;
  }

  toggleFileAssignmentTooltip(row: SentHomework): string {
    const currentState = row.files[0].status;
    const nextState = taskStatusToString.get(
      currentState === TaskStatus.Rejected ? 0 : currentState + 1
    );
    return `Zmień status plików:\n${taskStatusToString.get(
      currentState
    )} > ${nextState}`;
  }

  getFirstFileAssignmentNextState(row: SentHomework): string {
    const currentState = row.files[0].status;

    return currentState === TaskStatus.Rejected
      ? TaskStatus[0]
      : TaskStatus[currentState + 1];
  }

  async toggleFileAssignmentState(row: SentHomework) {
    const currentState = row.files[0].status;

    row.files.forEach(
      (file: SentHomeworkFile) =>
        (file.status =
          currentState === TaskStatus.Rejected ? 0 : currentState + 1)
    );

    await this.firestoreDocumentService.editSentHomework$(row);
  }

  getDate(date: Date | any) {
    return getDate(date);
  }
}
