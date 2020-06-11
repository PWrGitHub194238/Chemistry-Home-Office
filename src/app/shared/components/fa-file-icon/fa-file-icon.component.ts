import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import {
  faFile,
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "cho-fa-file-icon",
  templateUrl: "./fa-file-icon.component.html",
  styleUrls: ["./fa-file-icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaFileIconComponent {
  @Input() mimeType: string;
  @Input() size: string;

  static mimeIcon: Map<string, IconDefinition> = new Map([
    ["image/bmp", faFileImage],
    ["image/jpeg", faFileImage],
    ["image/png", faFileImage],
    ["text/plain", faFileAlt],
    ["application/pdf", faFilePdf],
    ["video/avi", faFileVideo],
    ["application/msword", faFileWord],
    [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      faFileWord
    ],
    ["application/vnd.ms-excel", faFileExcel],
    [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      faFileExcel
    ],
    ["application/vnd.ms-powerpoint", faFilePowerpoint],
    [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      faFilePowerpoint
    ],
    ["audio/mpeg", faFileAudio],
    ["video/mp4", faFileVideo],
    ["application/x-zip-compressed", faFileArchive],
    ["application/octet-stream", faFile],
    ["text", faFileAlt],
    ["image", faFileImage],
    ["video", faFileVideo],
    ["audio", faFileAudio]
  ]);

  get icon(): IconDefinition {
    if (FaFileIconComponent.mimeIcon.has(this.mimeType)) {
      return FaFileIconComponent.mimeIcon.get(this.mimeType);
    }

    const contentTypes = this.mimeType.split("/");

    contentTypes.forEach((contentType: string) => {
      if (FaFileIconComponent.mimeIcon.has(contentType)) {
        return FaFileIconComponent.mimeIcon.get(contentType);
      }
    });

    return faFile;
  }
}
