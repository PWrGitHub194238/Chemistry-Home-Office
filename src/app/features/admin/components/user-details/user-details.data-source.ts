import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { UserDisplayDict } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";

@Injectable({
  providedIn: "root"
})
export class UserDetailsDataSource extends BaseTableDataSource<
  UserDisplayDict
> {
  constructor(private authService: AuthService, private ngZone: NgZone) {
    super();
  }

  protected getData(): Observable<UserDisplayDict[]> {
    return this.authService.getAllUserDisplays$();
  }

  protected updateData(data: UserDisplayDict[]) {
    this.ngZone.run(() => super.updateData(data));
  }

  filterPredicate = (data: UserDisplayDict, filter: string) => {
    const lowerCaseFilter: string[] = filter.split(" ");
    let result = true;

    lowerCaseFilter.forEach((searchKey: string) => {
      const lowerCaseSearchKey = searchKey.toLowerCase();
      result =
        result && isNaN(Number(lowerCaseSearchKey))
          ? data.displayName.toLowerCase().includes(lowerCaseSearchKey) ||
            data.details.studentClass.toLowerCase() === lowerCaseSearchKey
          : data.details.studentNo === Number(lowerCaseSearchKey);
    });

    return result;
  };
}
