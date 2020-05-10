import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialDesignModule } from "../material-design.module";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { HighlightSearchPipe } from "./pipes/highlight-search/highlight-search.pipe";
import { RowActionButtonComponent } from "./components/row-action-button/row-action-button.component";
import { BottomActionButtonComponent } from "./components/bottom-action-button/bottom-action-button.component";
import { BottomActionMiniButtonComponent } from "./components/bottom-action-mini-button/bottom-action-mini-button.component";

const EXPORTED_COMPONENTS = [
  HighlightSearchPipe,
  SpinnerComponent,
  RowActionButtonComponent,
  BottomActionButtonComponent,
  BottomActionMiniButtonComponent
];
@NgModule({
  declarations: [AlertDialogComponent, ...EXPORTED_COMPONENTS],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ],
  exports: EXPORTED_COMPONENTS,
  entryComponents: [AlertDialogComponent]
})
export class SharedModule {}
