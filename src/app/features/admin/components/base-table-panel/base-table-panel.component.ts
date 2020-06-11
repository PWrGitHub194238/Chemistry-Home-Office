import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/core/services/auth.service";
import { BaseTableComponent } from "../../helpers/base-table/base-table.component";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";
import { EntityDialog } from "../../models/entity-dialog.model";

export abstract class BaseTablePanelComponent<
  T,
  U extends EntityDialog<T>
> extends BaseTableComponent<T, U> {
  constructor(
    dataSource: BaseTableDataSource<T>,
    private authService: AuthService,
    matDialog: MatDialog
  ) {
    super(dataSource, matDialog);
  }

  protected ngOnInit() {
    super.ngOnInit();
  }

  protected ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  protected ngOnDestroy() {
    super.ngOnDestroy();
  }

  logout() {
    this.authService.logout();
  }
}
