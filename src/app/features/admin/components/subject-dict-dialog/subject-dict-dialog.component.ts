import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Subject } from "src/app/models";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-subject-dict-dialog",
  templateUrl: "./subject-dict-dialog.component.html",
  styleUrls: ["./subject-dict-dialog.component.scss"]
})
export class SubjectDictDialogComponent extends BaseTablePanelDialogComponent<
  Subject
> {
  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private firestoreDocumentService: FirestoreDocumentService,
    dialogRef: MatDialogRef<SubjectDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: Subject | null;
    }
  ) {
    super(dialogRef, matDialog, data);
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  loadForm(selectedRow: Subject) {
    this.form = this.formBuilder.group({
      name: [selectedRow.name, [Validators.required]]
    });
  }

  buildItem(editMode: boolean, item: Subject): Subject {
    return {
      uid: this.editMode ? item.uid : null,
      name: this.name.value
    };
  }

  performAdd(item: Subject): Promise<Subject> {
    return this.firestoreDocumentService.createSubject(item);
  }

  performEdit(item: Subject): Promise<Subject> {
    return this.firestoreDocumentService.editSubject(item);
  }
}
