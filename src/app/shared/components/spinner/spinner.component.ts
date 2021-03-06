import { Component, Input } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "cho-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent {
  @Input() fullScreen: boolean = false;
  @Input() loadingMessage: string;
  @Input()
  set isLoading(isLoading: boolean) {
    if (isLoading) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  constructor(private spinner: NgxSpinnerService) {}
}
