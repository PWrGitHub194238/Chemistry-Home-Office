import { Component, OnInit, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { SnackBarData } from "src/app/core/models/snack-bar-data.model";

@Component({
  selector: "cho-snack-bar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"]
})
export class SnackBarComponent {
  get header(): string {
    return this.data.header;
  }

  get color(): string {
    return this.data.color;
  }

  get message(): string {
    return this.data.message;
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: SnackBarData) {}
}
