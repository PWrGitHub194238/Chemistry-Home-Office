import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { FaqPoint } from "../../model/faq-point.model";

@Component({
  selector: "cho-for-description",
  templateUrl: "./for-description.component.html",
  styleUrls: ["./for-description.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForDescriptionComponent {
  @Input() faqPoint: FaqPoint;
  @Output() pointClick = new EventEmitter<number>();
}
