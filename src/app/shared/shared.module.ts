import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialDesignModule } from "../material-design.module";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";
import { DragDropDirective } from "./directives/drag-drop/drag-drop.directive";
import { HighlightSearchPipe } from "./pipes/highlight-search/highlight-search.pipe";

@NgModule({
  declarations: [DragDropDirective, HighlightSearchPipe, AlertDialogComponent],
  imports: [CommonModule, MaterialDesignModule, FlexLayoutModule],
  exports: [HighlightSearchPipe],
  entryComponents: [AlertDialogComponent]
})
export class SharedModule {}
