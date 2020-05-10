import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cho-bottom-action-button",
  templateUrl: "./bottom-action-button.component.html",
  styleUrls: ["./bottom-action-button.component.scss"]
})
export class BottomActionButtonComponent {
  @Input() tooltip: string;
  @Input() icon: string;
  @Output() action = new EventEmitter<void>();
}
