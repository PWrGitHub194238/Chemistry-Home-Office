import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { AssignmentDictEntry } from "../models";
import { DictionaryService } from "../services/dictionary.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class AssignmentDictResolver {
  constructor(private dictionaryService: DictionaryService) {}

  resolve(): Observable<AssignmentDictEntry[]> {
    return this.dictionaryService
      .getAssignments$()
      .pipe(untilDestroyed(this), first());
  }
}
