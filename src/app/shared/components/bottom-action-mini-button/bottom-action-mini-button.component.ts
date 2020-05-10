import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cho-bottom-action-mini-button",
  templateUrl: "./bottom-action-mini-button.component.html",
  styleUrls: ["./bottom-action-mini-button.component.scss"]
})
export class BottomActionMiniButtonComponent {
  @Input() tooltip: string;
  @Input() icon: string;
  @Output() action = new EventEmitter<void>();
}
