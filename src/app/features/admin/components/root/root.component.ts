import { trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { slideInOutRouteOutletAnimation } from "src/app/shared/animations/router-animations";
import { AnimatedOutletComponent } from "src/app/shared/components/animated-outlet/animated-outlet.component";
import {
  adminChildAssignmentDictPath,
  adminChildClassDictPath,
  adminChildHomeworkPathsPath,
  adminChildMatIconsPath,
  adminChildSentHomeworksPath,
  adminChildSubjectDictPath,
  adminChildUserDetailsPath
} from "../../admin-routing.const";

@Component({
  selector: "cho-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
  animations: [
    trigger("slideInOut", [
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildClassDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildMatIconsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildHomeworkPathsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildSentHomeworksPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildSubjectDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildAssignmentDictPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildMatIconsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildHomeworkPathsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildSentHomeworksPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildSubjectDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildHomeworkPathsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildSentHomeworksPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildSubjectDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildSentHomeworksPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildSubjectDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildSubjectDictPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildUserDetailsPath,
        false,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildSubjectDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildSentHomeworksPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildHomeworkPathsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildMatIconsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildClassDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildUserDetailsPath,
        adminChildAssignmentDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildSentHomeworksPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildHomeworkPathsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildMatIconsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildClassDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSubjectDictPath,
        adminChildAssignmentDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildHomeworkPathsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildMatIconsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildClassDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildSentHomeworksPath,
        adminChildAssignmentDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildMatIconsPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildClassDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildHomeworkPathsPath,
        adminChildAssignmentDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildClassDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildMatIconsPath,
        adminChildAssignmentDictPath,
        true,
        "div"
      ),
      slideInOutRouteOutletAnimation(
        adminChildClassDictPath,
        adminChildAssignmentDictPath,
        true,
        "div",
        "div"
      )
    ])
  ]
})
export class RootComponent extends AnimatedOutletComponent {
  constructor(private router: Router) {
    super();
  }

  navigateAssignments() {
    this.router.navigate(["admin", "assignment-dict"]);
  }

  navigateClasses() {
    this.router.navigate(["admin", "class-dict"]);
  }

  navigateIcons() {
    this.router.navigate(["admin", "mat-icons"]);
  }

  navigateHomeworkPaths() {
    this.router.navigate(["admin", "homework-paths"]);
  }

  navigateSentHomeworks() {
    this.router.navigate(["admin", "sent-homeworks"]);
  }

  navigateSubjects() {
    this.router.navigate(["admin", "subject-dict"]);
  }

  navigateUsers() {
    this.router.navigate(["admin", "user-details"]);
  }
}
