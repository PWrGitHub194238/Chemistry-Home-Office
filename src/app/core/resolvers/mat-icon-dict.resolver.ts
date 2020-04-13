import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { MatIconDictEntry } from "../models";
import { DictionaryService } from "../services/dictionary.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class MatIconDictResolver {
  constructor(private dictionaryService: DictionaryService) {}

  resolve(): Observable<MatIconDictEntry[]> {
    return this.dictionaryService
      .getActiveMatIcons$()
      .pipe(untilDestroyed(this), first());
  }
}
