import { SentHomework, SentHomeworkFile } from "src/app/models";

export interface FileRowForm extends SentHomeworkFile {
  icon: string;
  contentType: string;
  downloadUrl: string;
  sentHomeworkRef?: SentHomework;
  statusFormIdx?: number;
}

export const mimeIcon: Map<string, string> = new Map([
  ["image/bmp", "assets/adm/ext-icons/file-image-o.png"],
  ["image/jpeg", "assets/adm/ext-icons/file-image-o.png"],
  ["image/png", "assets/adm/ext-icons/file-image-o.png"],
  ["text/plain", "assets/adm/ext-icons/file-text-o.png"],
  ["application/pdf", "assets/adm/ext-icons/file-pdf-o.png"],
  ["video/avi", "assets/adm/ext-icons/file-video-o.png"],
  ["application/msword", "assets/adm/ext-icons/file-word-o.png"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "assets/adm/ext-icons/file-word-o.png"
  ],
  ["application/vnd.ms-excel", "assets/adm/ext-icons/file-excel-o.png"],
  [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "assets/adm/ext-icons/file-excel-o.png"
  ],
  [
    "application/vnd.ms-powerpoint",
    "assets/adm/ext-icons/file-powerpoint-o.png"
  ],
  [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "assets/adm/ext-icons/file-powerpoint-o.png"
  ],
  ["audio/mpeg", "assets/adm/ext-icons/file-image-o.png"],
  ["video/mp4", "assets/adm/ext-icons/file-video-o.png"],
  ["application/x-zip-compressed", "assets/adm/ext-icons/file-archive-o.png"],
  ["application/octet-stream", "assets/adm/ext-icons/file-o.png"],
  ["text", "assets/adm/ext-icons/file-text-o.png"],
  ["image", "assets/adm/ext-icons/file-image-o.png"],
  ["video", "assets/adm/ext-icons/file-video-o.png"],
  ["audio", "assets/adm/ext-icons/file-audio-o.png"]
]);
