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

export const translateCenterAnimation: AnimationStyleMetadata = style({
  transform: "translateX(0%)",
  opacity: 1
});
export const translateLeftAnimation: AnimationStyleMetadata = style({
  transform: "translateX(-100%)",
  opacity: 0
});
export const translateRightAnimation: AnimationStyleMetadata = style({
  transform: "translateX(100%)",
  opacity: 0
});
