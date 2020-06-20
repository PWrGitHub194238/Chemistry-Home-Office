import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy } from "@ngneat/until-destroy";
import { SubjectDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { EmailSenderService } from "src/app/core/services/email-sender.service";
import { AlertDialog } from "src/app/shared/models";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { SubjectDictDialogComponent } from "../subject-dict-dialog/subject-dict-dialog.component";
import { SubjectDictsDataSource } from "./subject-dict.data-source";

@UntilDestroy()
@Component({
  selector: "cho-subject-dict",
  templateUrl: "./subject-dict.component.html",
  styleUrls: ["./subject-dict.component.scss"]
})
export class SubjectDictComponent
  extends BaseTablePanelComponent<SubjectDictEntry, SubjectDictDialogComponent>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ["name", "teacherEmail", "uid"];

  viewDialog = SubjectDictDialogComponent;
  addDialog = SubjectDictDialogComponent;
  editDialog = SubjectDictDialogComponent;

  constructor(
    private dictionaryService: DictionaryService,
    private emailSenderService: EmailSenderService,
    dataSource: SubjectDictsDataSource,
    authService: AuthService,
    matDialog: MatDialog
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

  onItemAdded(addedItem: SubjectDictEntry) {
    this.dataSource.data.push(addedItem);
    this.emailSenderService.sentNewSubjectNotificationEmail(addedItem);
    super.onItemAdded(addedItem);
  }

  onItemEdited(editedItem?: SubjectDictEntry) {
    if (editedItem) {
      this.dataSource.data.splice(
        this.dataSource.data.findIndex(
          (item: SubjectDictEntry) => item.uid === editedItem.uid
        ),
        1,
        editedItem
      );
      super.onItemEdited(editedItem);
    }
  }

  getOnDeleteAlertDialogOptions(selectedRow: SubjectDictEntry): AlertDialog {
    return {
      title: "Usuwanie przedmiotu lekcji",
      body: `Czy na pewno chcesz usunąć przedmiot lekcji '${selectedRow.name}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onItemDeleted(deletedItem: SubjectDictEntry) {
    this.dictionaryService.deleteSubject(deletedItem);
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (item: SubjectDictEntry) => item.uid === deletedItem.uid
      ),
      1
    );
    super.onItemDeleted(deletedItem);
  }
}
