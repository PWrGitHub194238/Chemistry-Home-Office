import { trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { RouterOutlet, ActivatedRoute, Router } from "@angular/router";
import { slideInOutRouteOutletAnimation } from "src/app/shared/animations/router-animations";
import {
  faqChildStudentPath,
  faqChildTeacherPath
} from "../../faq-routing.const";
import { AnimatedOutletComponent } from "src/app/shared/components/animated-outlet/animated-outlet.component";

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
export class ForSelectComponent extends AnimatedOutletComponent {
  constructor(private router: Router) {
    super();
  }

  navigateStudentHelp() {
    this.router.navigate(["faq", "student"]);
  }

  navigateTeacherHelp() {
    this.router.navigate(["faq", "teacher"]);
  }
}
