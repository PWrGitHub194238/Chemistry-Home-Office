import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AssignmentDictEntry, MatIconDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { AlertDialog } from "src/app/shared/models";
import { AssignmentDictDialogComponent } from "../assignment-dict-dialog/assignment-dict-dialog.component";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { AssignmentDictsDataSource } from "./assignment-dict.data-source";

@Component({
  selector: "cho-assignment-dict",
  templateUrl: "./assignment-dict.component.html",
  styleUrls: ["./assignment-dict.component.scss"]
})
export class AssignmentDictComponent
  extends BaseTablePanelComponent<
    AssignmentDictEntry,
    AssignmentDictDialogComponent
  >
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ["name", "icon", "uid"];

  viewDialog = AssignmentDictDialogComponent;
  addDialog = AssignmentDictDialogComponent;
  editDialog = AssignmentDictDialogComponent;

  private matIconsDict: MatIconDictEntry[];

  constructor(
    private route: ActivatedRoute,
    private dictionaryService: DictionaryService,
    dataSource: AssignmentDictsDataSource,
    authService: AuthService,
    matDialog: MatDialog
  ) {
    super(dataSource, authService, matDialog);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadResolvedData();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getViewDialogData() {
    return {
      matIconsDict: this.matIconsDict
    };
  }

  getAddDialogData() {
    return {
      matIconsDict: this.matIconsDict
    };
  }

  onItemAdded(addedItem: AssignmentDictEntry) {
    this.dataSource.data.push(addedItem);
    super.onItemAdded(addedItem);
  }

  getEditDialogData() {
    return {
      matIconsDict: this.matIconsDict
    };
  }

  onItemEdited(editedItem?: AssignmentDictEntry) {
    if (editedItem) {
      this.dataSource.data.splice(
        this.dataSource.data.findIndex(
          (item: AssignmentDictEntry) => item.uid === editedItem.uid
        ),
        1,
        editedItem
      );
      super.onItemEdited(editedItem);
    }
  }

  getOnDeleteAlertDialogOptions(selectedRow: AssignmentDictEntry): AlertDialog {
    return {
      title: "Usuwanie zadania",
      body: `Czy na pewno chcesz usunąć zadanie '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onItemDeleted(deletedItem: AssignmentDictEntry) {
    this.dictionaryService.deleteAssignment(deletedItem);
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (item: AssignmentDictEntry) => item.uid === deletedItem.uid
      ),
      1
    );
    super.onItemDeleted(deletedItem);
  }

  loadResolvedData() {
    this.matIconsDict = this.route.snapshot.data["matIconDict"];
  }
}
