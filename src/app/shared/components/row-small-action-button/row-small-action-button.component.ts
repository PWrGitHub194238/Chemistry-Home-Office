import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "cho-row-small-action-button",
  templateUrl: "./row-small-action-button.component.html",
  styleUrls: ["./row-small-action-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowSmallActionButtonComponent {
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
