import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { AssignmentDictEntry } from "src/app/core/models/dictionaries/assignment-dict-entry.model";

export interface AssignmentRowForm {
  filteredAssignments$: Observable<AssignmentDictEntry[]>;
  name: FormControl;
  iconIdx: FormControl;
}
