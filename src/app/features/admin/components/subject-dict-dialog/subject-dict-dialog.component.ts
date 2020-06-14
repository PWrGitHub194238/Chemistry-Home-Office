import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { take } from "rxjs/operators";
import { SubjectDictEntry } from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { EmailSenderService } from "src/app/core/services/email-sender.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/models";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-subject-dict-dialog",
  templateUrl: "./subject-dict-dialog.component.html",
  styleUrls: ["./subject-dict-dialog.component.scss"]
})
export class SubjectDictDialogComponent extends BaseTablePanelDialogComponent<
  SubjectDictEntry
> {
  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  get teacherEmail(): FormControl {
    return this.form.get("teacherEmail") as FormControl;
  }

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    private emailSenderService: EmailSenderService,
    dialogRef: MatDialogRef<SubjectDictDialogComponent>,
    matDialog: MatDialog,
    spinnerService: SpinnerService,
    changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: SubjectDictEntry | null;
    }
  ) {
    super(dialogRef, matDialog, spinnerService, changeDetector, data);
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      teacherEmail: ["", [Validators.required, Validators.email]]
    });
  }

  loadForm(selectedRow: SubjectDictEntry) {
    this.form = this.formBuilder.group({
      name: [
        { value: selectedRow.name, disabled: this.viewMode },
        [Validators.required]
      ],
      teacherEmail: [
        { value: selectedRow.teacherEmail, disabled: this.viewMode },
        [Validators.required, Validators.email]
      ]
    });
  }

  buildItem(editMode: boolean, item: SubjectDictEntry): SubjectDictEntry {
    if (item && this.teacherEmail.dirty) {
      this.sendEmailChangeNotifications(
        item.teacherEmail,
        this.teacherEmail.value,
        item
      );
    }

    return {
      uid: this.editMode ? item.uid : null,
      name: this.name.value,
      teacherEmail: this.teacherEmail.value
    };
  }

  protected async performAdd(
    item: SubjectDictEntry
  ): Promise<SubjectDictEntry> {
    return this.dictionaryService.createSubject(item);
  }

  protected async performEdit(
    item: SubjectDictEntry
  ): Promise<SubjectDictEntry> {
    return this.dictionaryService.editSubject(item);
  }

  private sendEmailChangeNotifications(
    oldMailValue: string,
    newMailValue: any,
    item: SubjectDictEntry
  ) {
    const alertData: AlertDialog = {
      title: "Zmieniono adres e-mail nauczyciela",
      body: `Adres, na który będą wysyłane zadania rozwiązywane przez uczniów zmienił się. Wysłać powiadomienie na oba adresy?`,
      cancelLabel: "Nie, nie wysyłaj",
      okLabel: "Tak, wyślij!"
    };

    this.matDialog
      .open(AlertDialogComponent, {
        data: alertData
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmAction: boolean) => {
        if (confirmAction) {
          this.emailSenderService.sentSubjectEmailChangedFromNotificationEmail(
            oldMailValue,
            item.name
          );
          this.emailSenderService.sentSubjectEmailChangedToNotificationEmail(
            newMailValue,
            item.name
          );
        }
      });
  }
}
