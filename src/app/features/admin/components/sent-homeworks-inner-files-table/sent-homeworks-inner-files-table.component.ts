import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {
  HomeworkPath,
  TaskStatus,
  taskStatusToClass,
  taskStatusToString
} from "src/app/models";
import { BaseTableComponent } from "../../helpers/base-table/base-table.component";
import { FileRowForm } from "../../models";
import { SentHomeworksInnerFilesTableDataSource } from "./sent-homeworks-inner-files-table.data-source";

@Component({
  selector: "cho-sent-homeworks-inner-files-table",
  templateUrl: "./sent-homeworks-inner-files-table.component.html",
  styleUrls: ["./sent-homeworks-inner-files-table.component.scss"],
  providers: [SentHomeworksInnerFilesTableDataSource],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentHomeworksInnerFilesTableComponent
  extends BaseTableComponent<FileRowForm, null>
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() homeworkPath: HomeworkPath;
  @Input() data: FileRowForm[];
  @Output() fileStateChange = new EventEmitter<FileRowForm>();

  columnsToDisplay = ["assignment", "icon", "uid"];

  taskStatus = TaskStatus;
  selectedFileForGallery: FileRowForm | undefined;

  constructor(
    dataSource: SentHomeworksInnerFilesTableDataSource,
    matDialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    super(dataSource, matDialog);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.isFirstChange()) {
      this.selectedFileForGallery = undefined;
      this.dataSource.data = this.data;
      this.dataSource.loadData();
      this.changeDetectorRefs.detectChanges();
    }
  }

  ngOnInit() {
    this.selectedFileForGallery = undefined;
    this.dataSource.data = this.data;
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setFileStatus(file: FileRowForm, status: TaskStatus) {
    file.status = status;
    this.fileStateChange.emit(file);
  }

  openGallery(index: number) {
    this.selectedFileForGallery = this.data[index];
  }

  onGalleryOpened(index: number) {
    this.selectedRow = this.data[index];
  }

  onGalleryClosed() {
    this.selectedFileForGallery = undefined;
    this.selectedRow = this.selectedFileForGallery;
  }

  onGalleryImageChange(index: number) {
    this.selectedFileForGallery = this.data[index];
    this.selectedRow = this.selectedFileForGallery;
  }

  getFileIconClass(status: TaskStatus): string {
    return taskStatusToClass.get(status);
  }

  downloadFile(file: FileRowForm) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open("GET", file.downloadUrl);
    xhr.send();
  }

  getFileTooltip(file: FileRowForm): string {
    return `Nazwa pliku: ${
      file.fileName ? file.fileName : "nie podano"
    }\nOpis pliku: ${
      file.description ? file.description : "nie podano"
    }\nStatus: ${taskStatusToString.get(file.status)}`;
  }
}
