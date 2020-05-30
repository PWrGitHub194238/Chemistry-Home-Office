import { Inject, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { AddEditDialog } from "../../models/add-edit-dialog.model";

export abstract class BaseTablePanelDialogComponent<T>
  implements OnInit, OnDestroy, AddEditDialog<T> {
  form: FormGroup;
  submitted: boolean;

  private subscription: Subscription;

  get selectedRow(): T | null {
    return this.data.selectedRow;
  }

  get editMode(): boolean {
    return this.selectedRow !== null;
  }

  constructor(
    private dialogRef: MatDialogRef<BaseTablePanelDialogComponent<T>>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      selectedRow: T | null;
    }
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createForm() {
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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let item = this.buildItem(this.editMode, this.selectedRow);

      if (this.editMode) {
        item = await this.performEdit(item);
      } else {
        item = await this.performAdd(item);
      }

      if (item) {
        this.dialogRef.close();
      }
    }
  }

  abstract buildItem(editMode: boolean, item: T): T;

  abstract async performEdit(item: T): Promise<T>;

  abstract async performAdd(item: T): Promise<T>;
}
