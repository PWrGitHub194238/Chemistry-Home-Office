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

const translateCenterAnimation: AnimationStyleMetadata = style({
  transform: "translateX(0%)"
});
const translateLeftAnimation: AnimationStyleMetadata = style({
  transform: "translateX(-100%)"
});
const translateRightAnimation: AnimationStyleMetadata = style({
  transform: "translateX(100%)"
});
