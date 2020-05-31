import {
  animate,
  animateChild,
  AnimationTransitionMetadata,
  group,
  query,
  transition,
  AnimationStyleMetadata,
  style
} from "@angular/animations";

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
      leftToRight
        ? style({
            transform: "translateX(-150%)",
            opacity: 0
          })
        : style({
            transform: "translateX(50%)",
            opacity: 0
          })
    ]),
    query(":leave " + leaveComponentSelector, [
      style({
        transform: "translateX(50%)",
        opacity: 1
      })
    ]),
    query(":leave " + leaveComponentSelector, animateChild()),
    group([
      query(":enter " + enterComponentSelector, [
        animate(
          "300ms ease-out",
          style({
            transform: "translateX(-50%)",
            opacity: 1
          })
        )
      ]),
      query(":leave " + leaveComponentSelector, [
        animate(
          "300ms ease-out",
          leftToRight
            ? style({
                transform: "translateX(150%)",
                opacity: 0
              })
            : style({
                transform: "translateX(-50%)",
                opacity: 0
              })
        )
      ])
    ]),
    query(":enter " + enterComponentSelector, animateChild())
  ]);
}

const translateCenterAnimation1: AnimationStyleMetadata = style({
  transform: "translateX(50%)",
  opacity: 1
});
const translateCenterAnimation: AnimationStyleMetadata = style({
  transform: "translateX(0%)",
  opacity: 1
});
const translateLeftAnimation: AnimationStyleMetadata = style({
  transform: "translateX(-100%)",
  opacity: 0
});
const translateRightAnimation: AnimationStyleMetadata = style({
  transform: "translateX(100%)",
  opacity: 0
});
