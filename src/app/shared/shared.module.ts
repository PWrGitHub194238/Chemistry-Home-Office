import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialDesignModule } from "../material-design.module";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";
import { BottomActionButtonComponent } from "./components/bottom-action-button/bottom-action-button.component";
import { BottomActionMiniButtonComponent } from "./components/bottom-action-mini-button/bottom-action-mini-button.component";
import { FaFileIconComponent } from "./components/fa-file-icon/fa-file-icon.component";
import { RowActionButtonComponent } from "./components/row-action-button/row-action-button.component";
import { RowSmallActionButtonComponent } from "./components/row-small-action-button/row-small-action-button.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { HighlightSearchPipe } from "./pipes/highlight-search/highlight-search.pipe";

const EXPORTED_COMPONENTS = [
  BottomActionButtonComponent,
  BottomActionMiniButtonComponent,
  FaFileIconComponent,
  HighlightSearchPipe,
  RowActionButtonComponent,
  RowSmallActionButtonComponent,
  SpinnerComponent
];
@NgModule({
  declarations: [AlertDialogComponent, ...EXPORTED_COMPONENTS],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  exports: EXPORTED_COMPONENTS,
  entryComponents: [AlertDialogComponent]
})
export class SharedModule {}
