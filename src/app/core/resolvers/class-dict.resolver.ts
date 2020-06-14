import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { ClassDictEntry } from "../models";
import { DictionaryService } from "../services/dictionary.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class ClassDictResolver {
  constructor(private dictionaryService: DictionaryService) {}

  resolve(): Observable<ClassDictEntry[]> {
    return this.dictionaryService
      .getAllClasses$(true)
      .pipe(untilDestroyed(this), first());
  }
}
