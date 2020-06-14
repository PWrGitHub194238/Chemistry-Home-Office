import { ComponentType } from "@angular/cdk/portal";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/models/alert-dialog.model";
import { EntityDialog } from "../../models/entity-dialog.model";
import { BaseTableDataSource } from "./base-table.data-source";

export abstract class BaseTableComponent<T, U extends EntityDialog<T>> {
  selectedRow: T;
  viewDialog: ComponentType<U> | null;
  addDialog: ComponentType<U> | null;
  editDialog: ComponentType<U> | null;

  private addDialogSubscription: Subscription;
  private editDialogSubscription: Subscription;
  private deleteDialogSubscription: Subscription;

  constructor(
    public dataSource: BaseTableDataSource<T>,
    protected matDialog: MatDialog
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  protected ngOnInit() {
    this.dataSource.loadData();
  }

  protected ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  protected ngOnDestroy() {
    if (this.addDialogSubscription) {
      this.addDialogSubscription.unsubscribe();
    }
    if (this.editDialogSubscription) {
      this.editDialogSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mouseEnter(rowSelection: T) {
    this.selectedRow = rowSelection;
  }

  mouseLeave() {
    this.selectedRow = null;
  }

  openViewSelectedItemDialog(selectedRow: T) {
    if (!this.viewDialog) {
      return;
    }

    this.matDialog.open(this.viewDialog, {
      height: "auto",
      width: "auto",
      data: {
        selectedRow,
        viewMode: true,
        ...this.getViewDialogData()
      }
    });
  }

  protected getViewDialogData(): { [key: string]: any } {
    return {};
  }

  openAddSelectedItemDialog() {
    if (!this.addDialog) {
      return;
    }

    const matDialogRef = this.matDialog.open(this.addDialog, {
      height: "auto",
      width: "auto",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        selectedRow: null,
        ...this.getAddDialogData()
      }
    });

    this.addDialogSubscription = matDialogRef
      .afterClosed()
      .subscribe((editedItem: T) => {
        if (editedItem) {
          this.onItemAdded(editedItem);
        }
      });
  }

  protected getAddDialogData(): { [key: string]: any } {
    return {};
  }

  protected onItemAdded(addedItem: T) {
    this.refreshDataSource();
  }

  openEditSelectedItemDialog(selectedRow: T) {
    if (!this.editDialog) {
      return;
    }

    const matDialogRef = this.matDialog.open(this.editDialog, {
      height: "auto",
      width: "auto",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        selectedRow,
        ...this.getEditDialogData()
      }
    });

    this.editDialogSubscription = matDialogRef
      .afterClosed()
      .subscribe((editedItem: T) => {
        if (editedItem) {
          this.onItemEdited(editedItem);
        }
      });
  }

  protected onItemEdited(editedItem?: T) {
    this.refreshDataSource();
  }

  protected getEditDialogData(): { [key: string]: any } {
    return {};
  }

  openDeleteSelectedItemDialog(selectedRow: T) {
    const dialogRef = this.matDialog.open(AlertDialogComponent, {
      data: this.getOnDeleteAlertDialogOptions(selectedRow)
    });

    this.deleteDialogSubscription = dialogRef
      .afterClosed()
      .subscribe((deleteSelection: boolean) => {
        if (deleteSelection) {
          this.onItemDeleted(selectedRow);
        }
      });
  }

  getOnDeleteAlertDialogOptions(selectedRow: T): AlertDialog {
    return {
      title: "Usuwanie",
      body: `Czy na pewno chcesz usunąć '${JSON.stringify(selectedRow)}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  protected onItemDeleted(deletedItem: T) {
    this.refreshDataSource();
  }

  private refreshDataSource() {
    this.dataSource.data = [...this.dataSource.data];
  }
}
