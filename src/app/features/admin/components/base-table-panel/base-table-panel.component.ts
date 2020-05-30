import { ComponentType } from "@angular/cdk/portal";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { AddEditDialog } from "../../models/add-edit-dialog.model";
import { BaseTablePanelDataSource } from "./base-table-panel.data-source";

@Component({
  selector: "cho-base-table-panel",
  templateUrl: "./base-table-panel.component.html",
  styleUrls: ["./base-table-panel.component.scss"]
})
export class BaseTablePanelComponent<T, U extends AddEditDialog<T>>
  implements OnInit, OnDestroy {
  @Input() panelIcon: string;
  @Input() panelTitle: string;
  @Input() panelSubtitle: string;
  @Input() searchPlaceholder: string;
  @Input() loadingMessage: string;
  @Input() dataSource: BaseTablePanelDataSource<T>;

  selectedRow: T;
  addEditDialog: ComponentType<U>;

  private subscription: Subscription;

  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.loadData();
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  logout() {
    this.authService.logout();
  }

  openAddSelectedItemDialog() {
    this.matDialog.open(this.addEditDialog, {
      height: "auto",
      width: "auto",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        selectedRow: null,
        ...this.getAddDialogData()
      }
    });
  }

  getAddDialogData(): { [key: string]: any } {
    return {};
  }

  openEditSelectedItemDialog() {
    this.matDialog.open(this.addEditDialog, {
      height: "auto",
      width: "auto",
      disableClose: true,
      closeOnNavigation: false,
      data: {
        selectedRow: this.selectedRow,
        ...this.getEditDialogData()
      }
    });
  }

  getEditDialogData(): { [key: string]: any } {
    return {};
  }

  openDeleteSelectedItemDialog() {
    const toDelete = this.selectedRow;
    const dialogRef = this.matDialog.open(AlertDialogComponent, {
      data: this.getOnDeleteAlertDialogOptions(toDelete)
    });

    this.subscription = dialogRef
      .afterClosed()
      .subscribe((deleteSelection: boolean) => {
        if (deleteSelection) {
          this.onDeleteAction(toDelete);
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

  onDeleteAction(selectedRow: T) {}
}
