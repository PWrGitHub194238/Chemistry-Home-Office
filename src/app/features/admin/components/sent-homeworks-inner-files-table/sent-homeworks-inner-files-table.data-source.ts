import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BaseTableDataSource } from "../../helpers/base-table/base-table.data-source";
import { FileRowForm } from "../../models/file-row-form.mode";

@Injectable({
  providedIn: "root"
})
export class SentHomeworksInnerFilesTableDataSource extends BaseTableDataSource<
  FileRowForm
> {
  protected getData(): Observable<FileRowForm[]> {
    return of(this.data);
  }
}
