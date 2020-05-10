import { RouterOutlet } from "@angular/router";

export class AnimatedOutletComponent {
  getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
