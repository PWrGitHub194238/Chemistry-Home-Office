import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "cho-row-action-button",
  templateUrl: "./row-action-button.component.html",
  styleUrls: ["./row-action-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowActionButtonComponent {
  @Input() matTooltipClass: string;
  @Input() tooltip: string;
  @Input() class: string;
  @Input() icon: string;
  @Input() iconClass: string;
  @Input() color: string;
  @Output() action = new EventEmitter<void>();

  emit(clickEvent: MouseEvent) {
    clickEvent.stopPropagation();
    this.action.emit();
  }
}
