import {
  animate,
  animateChild,
  AnimationTransitionMetadata,
  group,
  query,
  transition
} from "@angular/animations";
import {
  translateCenterAnimation,
  translateLeftAnimation,
  translateRightAnimation
} from "./animations";

export function slideInOutRouteOutletAnimation(
  enterComponentState: string,
  leaveComponentState: string,
  leftToRight: boolean = true,
  enterComponentSelector = "",
  leaveComponentSelector = ""
): AnimationTransitionMetadata {
  if (leaveComponentSelector === undefined) {
    enterComponentSelector = leaveComponentSelector;
  }
  return transition(`${enterComponentState} => ${leaveComponentState}`, [
    query(":enter " + enterComponentSelector, [
      leftToRight ? translateLeftAnimation : translateRightAnimation
    ]),
    query(":leave " + leaveComponentSelector, [translateCenterAnimation]),
    query(":leave " + leaveComponentSelector, animateChild()),
    group([
      query(":enter " + enterComponentSelector, [
        animate("300ms ease-out", translateCenterAnimation)
      ]),
      query(":leave " + leaveComponentSelector, [
        animate(
          "300ms ease-out",
          leftToRight ? translateRightAnimation : translateLeftAnimation
        )
      ])
    ]),
    query(":enter " + enterComponentSelector, animateChild())
  ]);
}
