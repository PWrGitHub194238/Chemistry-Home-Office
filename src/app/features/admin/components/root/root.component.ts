import { trigger, AnimationMetadata } from "@angular/animations";
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

function getAnimations(): AnimationMetadata[] {
  const slideInOut: AnimationMetadata[] = [];
  const componentStates: string[] = [
    adminChildAssignmentDictPath,
    adminChildClassDictPath,
    adminChildMatIconsPath,
    adminChildHomeworkPathsPath,
    adminChildSentHomeworksPath,
    adminChildSubjectDictPath,
    adminChildUserDetailsPath
  ];

  for (let i = 0; i < componentStates.length; i += 1) {
    for (let j = i + 1; j < componentStates.length; j += 1) {
      slideInOut.push(
        slideInOutRouteOutletAnimation(
          componentStates[i],
          componentStates[j],
          false
        )
      );
    }
  }

  const componentReverseStates = [...componentStates].reverse();

  for (let i = 0; i < componentReverseStates.length; i += 1) {
    for (let j = i + 1; j < componentReverseStates.length; j += 1) {
      slideInOut.push(
        slideInOutRouteOutletAnimation(
          componentReverseStates[i],
          componentReverseStates[j],
          true
        )
      );
    }
  }

  return slideInOut;
}

@Component({
  selector: "cho-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
  animations: [trigger("slideInOut", getAnimations())]
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
