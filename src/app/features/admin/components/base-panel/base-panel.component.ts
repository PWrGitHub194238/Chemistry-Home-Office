import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "cho-base-panel",
  templateUrl: "./base-panel.component.html",
  styleUrls: ["./base-panel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasePanelComponent {
  @Input() panelIcon: string;
  @Input() panelTitle: string;
  @Input() panelSubtitle: string;
}
