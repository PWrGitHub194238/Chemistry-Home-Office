import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatIconDictEntry } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { BaseTablePanelComponent } from "../base-table-panel/base-table-panel.component";
import { MatIconDictsDataSource } from "./mat-icon-dict.data-source";

@UntilDestroy()
@Component({
  selector: "cho-mat-icon-dict",
  templateUrl: "./mat-icon-dict.component.html",
  styleUrls: ["./mat-icon-dict.component.scss"]
})
export class MatIconDictComponent
  extends BaseTablePanelComponent<MatIconDictEntry, null>
  implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ["name"];

  constructor(
    dataSource: MatIconDictsDataSource,
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

  mouseClick(matIcon: MatIconDictEntry) {
    this.dictionaryService
      .getAllActiveIcons$(true)
      .pipe(untilDestroyed(this))
      .subscribe((activeMatIcons: MatIconDictEntry[]) => {
        matIcon.active = !matIcon.active;
        if (matIcon.active) {
          this.dictionaryService.setAllActiveIcons$(matIcon, activeMatIcons);
        } else {
          this.dictionaryService.setAllActiveIcons$(
            matIcon,
            activeMatIcons.splice(
              activeMatIcons.findIndex(
                (icon: MatIconDictEntry) => icon.name === matIcon.name
              ),
              1
            )
          );
        }
      });
  }
}
