import { ChangeDetectorRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/models";
import { EntityDialog } from "../../models";

export abstract class BaseTablePanelDialogComponent<T>
  implements OnInit, OnDestroy, EntityDialog<T> {
  form: FormGroup;
  submitted: boolean;

  private subscription: Subscription;

  get selectedRow(): T | null {
    return this.data.selectedRow;
  }

  get editMode(): boolean {
    return this.selectedRow !== null;
  }

  get viewMode(): boolean {
    return this.editMode && !!this.data["viewMode"];
  }

  constructor(
    private dialogRef: MatDialogRef<BaseTablePanelDialogComponent<T>>,
    protected matDialog: MatDialog,
    protected spinnerService: SpinnerService,
    private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      selectedRow: T | null;
    }
  ) {}

  ngOnInit() {
    this.createForm();
    this.afterOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected afterOnInit() {}

  private createForm() {
    if (this.editMode) {
      this.loadForm(this.selectedRow);
    } else {
      this.createNewForm();
    }
  }

  abstract createNewForm(): void;

  abstract loadForm(selectedRow: T): void;

  onReset() {
    this.createForm();
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  onCancel() {
    if (this.form.pristine) {
      this.dialogRef.close();
    } else {
      const alertData: AlertDialog = {
        title: "Niezapisane zmiany",
        body: `Czy na pewno chcesz zamknąć okno mimo niezapisanych zmian?`,
        cancelLabel: "Nie, nie zamykaj",
        okLabel: "Tak, zamknij!"
      };
      const dialogRef = this.matDialog.open(AlertDialogComponent, {
        data: alertData
      });

      this.subscription = dialogRef
        .afterClosed()
        .subscribe((closeDialog: boolean) => {
          if (closeDialog) {
            this.dialogRef.close();
          }
        });
    }
  }

  async onSubmit() {
    if (this.form.pristine) {
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
      if (this.form.valid) {
        this.spinnerService.showSpinner(SpinnerMessage.SavingChanges);
        this.changeDetector.detectChanges();
        let item = this.buildItem(this.editMode, this.selectedRow);

        if (this.editMode) {
          item = await this.performEdit(item);
        } else {
          item = await this.performAdd(item);
        }

        this.spinnerService.hideSpinner();
        if (item) {
          this.dialogRef.close(item);
        }
      }
    }
  }

  protected buildItem(editMode: boolean, item: T): T {
    return {} as T;
  }

  protected async performEdit(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  protected async performAdd(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}
