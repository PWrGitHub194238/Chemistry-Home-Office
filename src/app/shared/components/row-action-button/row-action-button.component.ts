import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "cho-row-action-button",
  templateUrl: "./row-action-button.component.html",
  styleUrls: ["./row-action-button.component.scss"]
})
export class RowActionButtonComponent {
  @Input() tooltip: string;
  @Input() icon: string;
  @Input() color: string;
  @Output() action = new EventEmitter<void>();
}
