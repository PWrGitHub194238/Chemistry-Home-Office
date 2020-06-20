import {
  animate,
  AnimationMetadata,
  state,
  style,
  transition,
  AnimationStyleMetadata
} from "@angular/animations";

export function slideInOutAnimation(
  inState: string,
  toRightOutState: string,
  toLeftOutState: string
): AnimationMetadata[] {
  return [
    state(inState, translateCenterAnimation),
    state(toRightOutState, translateRightAnimation),
    state(toLeftOutState, translateLeftAnimation),
    transition(`${toRightOutState} => ${inState}`, [animate("500ms ease-out")]),
    transition(`${toLeftOutState} => ${inState}`, [animate("500ms ease-out")]),
    transition(`${inState} => ${toRightOutState}`, [animate("500ms ease-in")]),
    transition(`${inState} => ${toLeftOutState}`, [animate("500ms ease-in")])
  ];
}

export function slideExpandCollapseAnimation(): AnimationMetadata[] {
  return [
    state("collapsed", style({ height: "0px", minHeight: "0" })),
    state("expanded", style({ height: "*" })),
    transition(
      "expanded <=> collapsed",
      animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
    )
  ];
}

const translateCenterAnimation: AnimationStyleMetadata = style({
  transform: "translateX(0%)"
});
const translateLeftAnimation: AnimationStyleMetadata = style({
  transform: "translateX(-100%)"
});
const translateRightAnimation: AnimationStyleMetadata = style({
  transform: "translateX(100%)"
});
