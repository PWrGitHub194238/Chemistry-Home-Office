import { Component } from "@angular/core";
import { FaqPoint } from "../../model/faq-point.model";

@Component({
  selector: "cho-for-student",
  templateUrl: "./for-student.component.html",
  styleUrls: ["./for-student.component.scss"]
})
export class ForStudentComponent {
  public faqPoints: FaqPoint[] = [
    {
      icon: "fingerprint",
      header: `Zaloguj się na swoje konto ucznia <br />
        bądź stwórz nowe`,
      bulletPoints: ["Point 1a", "Point 1b", "Point 1c"],
      slideImages: ["assets/1.png", "assets/1.png", "assets/1.png"]
    },
    {
      icon: "fingerprint",
      header: `new się na swoje konto ucznia <br />
        bądź stwórz nowe`,
      bulletPoints: ["Point 2a <br /> pp", "Point 1b", "Point 1c"],
      slideImages: ["assets/1.png", "assets/1.png", "assets/1.png"]
    },
    {
      icon: "fingerprint",
      header: `Zaloguj się na swoje konto ucznia <br />
        bądź stwórz nowe`,
      bulletPoints: ["Point 1a", "Point 1b", "Point 1c"],
      slideImages: ["assets/1.png", "assets/1.png", "assets/1.png"]
    },
    {
      icon: "fingerprint",
      header: `new się na swoje konto ucznia <br />
        bądź stwórz nowe`,
      bulletPoints: ["Point 2a <br /> pp", "Point 1b", "Point 1c"],
      slideImages: ["assets/1.png", "assets/1.png", "assets/1.png"]
    }
  ];
}
