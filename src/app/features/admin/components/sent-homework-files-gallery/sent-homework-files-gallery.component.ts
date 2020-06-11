import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {
  GALLERY_CONF,
  GALLERY_IMAGE,
  NgxImageGalleryComponent
} from "ngx-image-gallery";
import {
  SentHomeworkFile,
  TaskStatus,
  taskStatusToClass,
  taskStatusToString
} from "src/app/models";
import { FileRowForm, GalleryImageTransform, mimeIcon } from "../../models";

@Component({
  selector: "cho-sent-homework-files-gallery",
  templateUrl: "./sent-homework-files-gallery.component.html",
  styleUrls: ["./sent-homework-files-gallery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentHomeworkFilesGalleryComponent implements OnChanges {
  @Input() selectedFile: FileRowForm = null;
  @Input() fileGallery: FileRowForm[] = [];
  @Input() subPanelEnabled: boolean = true;
  @Input() panelEnabled: boolean = true;
  @Input() galleryConfig: GALLERY_CONF = {
    imageBorderRadius: "30px",
    imageOffset: "50px",
    showThumbnails: false,
    reactToMouseWheel: false
  };
  @Output() onOpen = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<null>();
  @Output() onImageClicked = new EventEmitter<number>();
  @Output() onImageChange = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() fileStateChange = new EventEmitter<FileRowForm>();

  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;

  taskStatus = TaskStatus;
  fileImages: GALLERY_IMAGE[] = [];
  fileImagesTransformData: GalleryImageTransform[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fileGallery && changes.fileGallery.currentValue) {
      this.initGallery();
    }

    if (changes.selectedFile) {
      if (
        !changes.selectedFile.previousValue &&
        changes.selectedFile.currentValue
      ) {
        this.openGallery(this.selectedFile.statusFormIdx);
      } else if (
        changes.selectedFile.previousValue &&
        changes.selectedFile.currentValue
      ) {
        this.newImage(this.selectedFile.statusFormIdx);
      } else if (
        changes.selectedFile.previousValue &&
        !changes.selectedFile.currentValue
      ) {
        this.closeGallery();
      }
    }
  }

  getFileIconClass(status: TaskStatus): string {
    return taskStatusToClass.get(status);
  }

  setFileStatus(file: FileRowForm, status: TaskStatus) {
    file.status = status;
    this.fileStateChange.emit(file);
  }

  rotateLeft() {
    this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ].galleryRotate -= 90;
    this.refreshGalleryImageStyle();
  }

  zoomOut() {
    this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ].galleryScale -= 0.1;
    this.refreshGalleryImageStyle();
  }

  flipHorizontaly() {
    this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ].galleryHorizontalFlip *= -1;
    this.refreshGalleryImageStyle();
  }

  zoomIn() {
    this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ].galleryScale += 0.1;
    this.refreshGalleryImageStyle();
  }

  rotateRight() {
    this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ].galleryRotate += 90;
    this.refreshGalleryImageStyle();
  }

  downloadFile(file: FileRowForm) {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open("GET", file.downloadUrl);
    xhr.send();
  }

  galleryOpened(index: number) {
    this.onOpen.emit(index);
  }

  galleryClosed() {
    this.onClose.emit();
  }

  galleryImageClicked(index: number) {
    if (this.ngxImageGallery.opened) {
      this.onImageClicked.emit(index);
    }
  }

  galleryImageChanged(index: number) {
    if (this.ngxImageGallery.opened) {
      this.onImageChange.emit(index);
    }
  }

  deleteImage(index: number) {
    if (this.ngxImageGallery.opened) {
      this.onDelete.emit(index);
    }
  }

  private openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  private closeGallery() {
    this.ngxImageGallery.close();
  }

  private newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  isImage(file: FileRowForm): boolean {
    return (
      file.contentType === "image/jpeg" || file.contentType === "image/png"
    );
  }

  private getExtensionIconUrl(file: FileRowForm): string {
    if (mimeIcon.has(file.contentType)) {
      return mimeIcon.get(file.contentType);
    }

    const contentTypes = file.contentType.split("/");

    contentTypes.forEach((contentType: string) => {
      if (mimeIcon.has(contentType)) {
        return mimeIcon.get(contentType);
      }
    });

    return mimeIcon.get("application/octet-stream");
  }

  private initGallery() {
    this.fileImages = this.fileGallery.map((file: FileRowForm) => ({
      url: this.getFileUrl(file),
      altText: this.getFileTooltip(file),
      title: file.fileName,
      extUrl: file.downloadUrl,
      extUrlTarget: "_blank"
    }));

    if (this.ngxImageGallery) {
      this.ngxImageGallery.images = this.fileImages;
    }

    this.initFileImageTransformData();
  }

  private getFileUrl(file: FileRowForm): string {
    if (this.isImage(file)) {
      return file.downloadUrl;
    } else {
      return this.getExtensionIconUrl(file);
    }
  }

  private getFileTooltip(file: SentHomeworkFile): string {
    return `Nazwa pliku: ${
      file.fileName ? file.fileName : "nie podano"
    }\nOpis pliku: ${
      file.description ? file.description : "nie podano"
    }\nStatus: ${taskStatusToString.get(file.status)}`;
  }

  private initFileImageTransformData() {
    this.fileImagesTransformData = [];

    this.fileGallery.forEach(() => {
      this.fileImagesTransformData.push({
        galleryHorizontalFlip: 1,
        galleryScale: 1,
        galleryRotate: 0
      });
    });
  }

  private refreshGalleryImageStyle() {
    const transformData: GalleryImageTransform = this.fileImagesTransformData[
      this.selectedFile.statusFormIdx
    ];
    (this.ngxImageGallery as any).galleryElem.nativeElement.querySelector(
      ".images-container"
    ).style.transform = `rotate(${transformData.galleryRotate}deg) scaleX(${transformData.galleryHorizontalFlip}) scale(${transformData.galleryScale})`;
  }
}
