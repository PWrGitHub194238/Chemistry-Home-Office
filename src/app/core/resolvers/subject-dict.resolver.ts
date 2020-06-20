import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { SubjectDictEntry } from "../models";
import { DictionaryService } from "../services/dictionary.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class SubjecDictResolver {
  constructor(private dictionaryService: DictionaryService) {}

  resolve(): Observable<SubjectDictEntry[]> {
    return this.dictionaryService
      .getAllSubjects$(true)
      .pipe(untilDestroyed(this), first());
  }
}
