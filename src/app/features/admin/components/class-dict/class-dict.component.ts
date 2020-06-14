import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClassDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { AlertDialog } from "src/app/shared/models/alert-dialog.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { ClassDictDialogComponent } from "../class-dict-dialog/class-dict-dialog.component";
import { ClassDictsDataSource } from "./class-dict.data-source";

@Component({
  selector: "cho-class-dict",
  templateUrl: "./class-dict.component.html",
  styleUrls: ["./class-dict.component.scss"]
})
export class ClassDictComponent
  extends BaseTablePanelComponent<ClassDictEntry, ClassDictDialogComponent>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ["classNo", "subclass", "studentCount", "uid"];

  viewDialog = ClassDictDialogComponent;
  addDialog = ClassDictDialogComponent;
  editDialog = ClassDictDialogComponent;

  constructor(
    dataSource: ClassDictsDataSource,
    authService: AuthService,
    matDialog: MatDialog,
    private dictionaryService: DictionaryService
  ) {
    super(dataSource, authService, matDialog);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onItemAdded(addedItem: ClassDictEntry) {
    this.dataSource.data.push(addedItem);
    super.onItemAdded(addedItem);
  }

  onItemEdited(editedItem?: ClassDictEntry) {
    if (editedItem) {
      this.dataSource.data.splice(
        this.dataSource.data.findIndex(
          (item: ClassDictEntry) => item.uid === editedItem.uid
        ),
        1,
        editedItem
      );
      super.onItemEdited(editedItem);
    }
  }

  onItemDeleted(deletedItem: ClassDictEntry) {
    this.dictionaryService.deleteClass(deletedItem);
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (item: ClassDictEntry) => item.uid === deletedItem.uid
      ),
      1
    );
    super.onItemDeleted(deletedItem);
  }

  getOnDeleteAlertDialogOptions(selectedRow: ClassDictEntry): AlertDialog {
    return {
      title: "Usuwanie klasy",
      body: `Czy na pewno chcesz usunąć klasę '${selectedRow.classNo}${selectedRow.subclass}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }
}
