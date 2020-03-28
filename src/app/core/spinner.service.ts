import { Injectable } from "@angular/core";
import * as stringFormat from "string-format";
import { SpinnerMessage } from "./spinner-message.consts";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  isLoading: boolean;
  loadingMessage: any;

  constructor() {}

  showSpinner(spinnerMessage: SpinnerMessage, args?: { [k: string]: any }) {
    this.isLoading = true;
    this.loadingMessage = stringFormat(spinnerMessage, args);
  }

  hideSpinner() {
    this.isLoading = false;
    this.loadingMessage = SpinnerMessage.NoMessage;
  }
}
