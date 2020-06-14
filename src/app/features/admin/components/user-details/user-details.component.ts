import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserDisplayDict } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertDialog } from "src/app/shared/models";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { UserDetailsDialogComponent } from "../user-details-dialog/user-details-dialog.component";
import { UserDetailsDataSource } from "./user-details.data-source";

@UntilDestroy()
@Component({
  selector: "cho-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent
  extends BaseTablePanelComponent<UserDisplayDict, UserDetailsDialogComponent>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = [
    "disabled",
    "displayName",
    "studentClass",
    "studentNo",
    "uid"
  ];

  viewDialog = UserDetailsDialogComponent;
  editDialog = UserDetailsDialogComponent;

  constructor(
    dataSource: UserDetailsDataSource,
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

  getUserAvatarUrl(selectedRow: UserDisplayDict) {
    return selectedRow.photoURL
      ? selectedRow.photoURL
      : selectedRow.displayName.split(" ")[0].endsWith("a")
      ? "assets/adm/user-icon-female.png"
      : "assets/adm/user-icon-male.png";
  }

  onItemEdited(editedItem?: UserDisplayDict) {
    if (editedItem) {
      this.dataSource.data.splice(
        this.dataSource.data.findIndex(
          (item: UserDisplayDict) => item.uid === editedItem.uid
        ),
        1,
        editedItem
      );
      super.onItemEdited(editedItem);
    }
  }

  getOnDeleteAlertDialogOptions(selectedRow: UserDisplayDict): AlertDialog {
    return {
      title: "Usuwanie użytkownika",
      body: `Czy na pewno chcesz usunąć użytkownika '${selectedRow.displayName}'?`,
      cancelLabel: "Nie, nie usuwaj",
      okLabel: "Tak, usuwamy!"
    };
  }

  onItemDeleted(deletedItem: UserDisplayDict) {
    this.authService.deleteUserDisplay$(deletedItem);
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(
        (item: UserDisplayDict) => item.uid === deletedItem.uid
      ),
      1
    );
    super.onItemDeleted(deletedItem);
  }

  openVerifyEmailDialog(selectedRow: UserDisplayDict) {
    const dialogRef = this.matDialog.open(AlertDialogComponent, {
      data: {
        title: "Weryfikuj e-mail",
        body: `Czy na pewno wysłać e-mail weryfikujący do ${selectedRow.displayName}?`,
        cancelLabel: "Nie, nie wysyłaj",
        okLabel: "Tak, wysyłamy!"
      }
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.authService.sentValidateEmailToUser(
            selectedRow.uid,
            selectedRow.displayName
          );
        }
      });
  }

  openPasswordResetDialog(selectedRow: UserDisplayDict) {
    const dialogRef = this.matDialog.open(AlertDialogComponent, {
      data: {
        title: "Resetuj hasło",
        body: `Czy na pewno chcesz zresetować hasło użytkownikowi ${selectedRow.displayName}?`,
        cancelLabel: "Nie, nie wysyłaj",
        okLabel: "Tak, wysyłamy!"
      }
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.authService.sentResetPasswordToUser(
            selectedRow.uid,
            selectedRow.displayName
          );
        }
      });
  }
}
