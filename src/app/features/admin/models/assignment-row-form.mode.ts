import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { AssignmentDictEntry } from "src/app/core/models";

export interface AssignmentRowForm {
  filteredAssignments$: Observable<AssignmentDictEntry[]>;
  uid: FormControl;
  name: FormControl;
  iconIdx: FormControl;
}
