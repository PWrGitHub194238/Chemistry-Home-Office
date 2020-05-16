import { Component } from "@angular/core";
import { FaqPoint } from "../../model/faq-point.model";

@Component({
  selector: "cho-for-teacher",
  templateUrl: "./for-teacher.component.html",
  styleUrls: ["./for-teacher.component.scss"]
})
export class ForTeacherComponent {
  public faqPoints: FaqPoint[] = [
    {
      icon: "",
      header: ``,
      bulletPoints: [
        {
          slideIndex: 0,
          description: ``
        }
      ],
      slideImages: ["assets/1.png"]
    }
  ];
}
