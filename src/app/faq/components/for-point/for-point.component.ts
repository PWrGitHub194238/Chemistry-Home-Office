import { trigger } from "@angular/animations";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatCarouselComponent } from "@ngmodule/material-carousel";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { InViewportMetadata } from "ng-in-viewport";
import { of } from "rxjs";
import { delay, startWith, timeout } from "rxjs/operators";
import { slideInOutAnimation } from "src/app/shared/animations/animations";
import { FaqPoint } from "../../model";

@UntilDestroy()
@Component({
  selector: "cho-for-point",
  templateUrl: "./for-point.component.html",
  styleUrls: ["./for-point.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      "slideInOut",
      slideInOutAnimation(
        "visible-in-slide",
        "visible-out-left-to-right-slide",
        "visible-out-right-to-left-slide"
      )
    )
  ]
})
export class ForPointComponent implements OnInit {
  private fxFlexOrderAray: number[] = [1, 2, 3, 4, 5];
  private fxFlexOrderRevertedAray: number[] = [5, 4, 3, 2, 1];
  private fxFlexCarouselOrderAray: number[] = [1, 2];
  private fxFlexOrderCarouselRevertedAray: number[] = [2, 1];
  private enabledAnimation: boolean;
  private resetAutoPlayTimeout: number | undefined;

  @Input() number: number;
  @Input() faqPoint: FaqPoint;

  @ViewChild(MatCarouselComponent) private carousel: MatCarouselComponent;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    of()
      .pipe(startWith(null), delay(300), untilDestroyed(this))
      .subscribe(() => {
        this.enabledAnimation = true;
        this.changeDetector.detectChanges();
      });
  }

  get fxFlexOrder(): number[] {
    if (this.isEven()) {
      return this.fxFlexOrderAray;
    } else {
      return this.fxFlexOrderRevertedAray;
    }
  }

  get fxFlexCarouselOrder(): number[] {
    if (this.isEven()) {
      return this.fxFlexCarouselOrderAray;
    } else {
      return this.fxFlexOrderCarouselRevertedAray;
    }
  }

  get descriptionAnimationState(): string {
    if (!this.enabledAnimation) {
      return null;
    }

    if (this.isEven()) {
      return this.faqPoint.visible
        ? "visible-in-slide"
        : "visible-out-right-to-left-slide";
    } else {
      return this.faqPoint.visible
        ? "visible-in-slide"
        : "visible-out-left-to-right-slide";
    }
  }

  get carouselAnimationState(): string {
    if (!this.enabledAnimation) {
      return null;
    }

    if (this.isEven()) {
      return this.faqPoint.visible
        ? "visible-in-slide"
        : "visible-out-left-to-right-slide";
    } else {
      return this.faqPoint.visible
        ? "visible-in-slide"
        : "visible-out-right-to-left-slide";
    }
  }

  onViewportChanged(event: any) {
    const {
      [InViewportMetadata]: { entry },
      target,
      visible
    } = event;

    this.faqPoint.visible = visible;
  }

  onPointClick(index: number) {
    this.carousel.autoplay = false;
    this.carousel.slideTo(index);

    if (this.resetAutoPlayTimeout) {
      window.clearTimeout(this.resetAutoPlayTimeout);
    }

    this.resetAutoPlayTimeout = window.setTimeout(() => {
      this.carousel.next();
      this.carousel.autoplay = true;
    }, 5000);
  }

  private isEven() {
    return this.number % 2 == 0;
  }
}
