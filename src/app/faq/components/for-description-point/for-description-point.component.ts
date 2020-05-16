import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { BulletPoint } from "../../model/bullet-point.model";

@Component({
  selector: "cho-for-description-point",
  templateUrl: "./for-description-point.component.html",
  styleUrls: ["./for-description-point.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForDescriptionPointComponent {
  private fxFlexOrderAray: number[] = [1, 2, 3];
  private fxFlexOrderRevertedAray: number[] = [2, 3, 1];

  @Input() number: number;
  @Input() body: BulletPoint;
  @Output() pointClick = new EventEmitter<number>();

  get fxFlexOrder(): number[] {
    if (this.isEven()) {
      return this.fxFlexOrderAray;
    } else {
      return this.fxFlexOrderRevertedAray;
    }
  }

  private isEven() {
    return this.number % 2 == 0;
  }
}
