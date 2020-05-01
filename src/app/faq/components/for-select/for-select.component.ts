import { trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slideInOutRouteOutletAnimation } from "src/app/shared/animations/router-animations";
import {
  faqChildStudentPath,
  faqChildTeacherPath
} from "../../faq-routing.const";

@Component({
  selector: "cho-for-select",
  templateUrl: "./for-select.component.html",
  styleUrls: ["./for-select.component.scss"],
  animations: [
    trigger("slideInOut", [
      slideInOutRouteOutletAnimation(
        faqChildStudentPath,
        faqChildTeacherPath,
        false,
        "ng-scrollbar"
      ),
      slideInOutRouteOutletAnimation(
        faqChildTeacherPath,
        faqChildStudentPath,
        true,
        "ng-scrollbar"
      )
    ])
  ]
})
export class ForSelectComponent {
  getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
