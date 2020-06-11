import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SubjectDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { AlertDialog } from "src/app/shared/models/alert-dialog.model";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { SubjectDictDialogComponent } from "../subject-dict-dialog/subject-dict-dialog.component";
import { SubjectDictsDataSource } from "./subject-dict.data-source";

@Component({
  selector: "cho-subject-dict",
  templateUrl: "./subject-dict.component.html",
  styleUrls: ["./subject-dict.component.scss"]
})
export class SubjectDictComponent
  extends BaseTablePanelComponent<SubjectDictEntry, SubjectDictDialogComponent>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ["name", "uid"];

  viewDialog = SubjectDictDialogComponent;
  addDialog = SubjectDictDialogComponent;
  editDialog = SubjectDictDialogComponent;

  constructor(
    dataSource: SubjectDictsDataSource,
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

  getOnDeleteAlertDialogOptions(selectedRow: SubjectDictEntry): AlertDialog {
    return {
      title: "Usuwanie przedmiotu lecji",
      body: `Czy na pewno chcesz usunąć przedmiot lekcji '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onDeleteAction(selectedRow: SubjectDictEntry) {
    this.dictionaryService.deleteSubject(selectedRow);
  }
}
