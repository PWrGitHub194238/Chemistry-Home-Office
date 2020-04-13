import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { first, map } from "rxjs/operators";
import { ClassDictEntry } from "src/app/core/models/dictionaries/class-dict-entry.model";
import { DictionaryService } from "src/app/core/services/dictionary.service";

export class LoginFormValidator {
  static Name(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        !control.value.match(
          /^[^0-9`\-]{2,}\s[^0-9`\-]{1,}'?-?[^0-9`\-]{2,}\s?([^0-9`\-]{1,})?$/
        )
      ) {
        return {
          name: true
        };
      }

      if (
        control.value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        return {
          mail: true
        };
      }
      return null;
    };
  }

  static StudentClass(
    dictionaryService: DictionaryService,
    studentNoControl: () => FormControl
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value as string;

      if (!control.value) {
        return of(null);
      }

      return dictionaryService.getClasses$().pipe(
        map((classes: ClassDictEntry[]) => {
          const allowedClasses: string[] = classes.map(c =>
            `${c.classNo}${c.subclass}`.toUpperCase()
          );
          if (!allowedClasses.includes(value.toUpperCase())) {
            studentNoControl().setValue(null);
            studentNoControl().disable();
            return {
              class: true
            };
          }

          studentNoControl().enable();
          return null;
        }),
        first()
      );
    };
  }

  static StudentNo(
    dictionaryService: DictionaryService,
    studentClass: () => string
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const studentClassValue: string = studentClass();

      if (!studentClassValue) {
        return of({
          noClass: true
        });
      }

      const value = Number(control.value as string);

      if (isNaN(value)) {
        return of({
          no: true
        });
      }

      return dictionaryService.getClasses$().pipe(
        map((classes: ClassDictEntry[]) => {
          const classDef: ClassDictEntry = classes.find(
            (c: ClassDictEntry) =>
              studentClassValue === `${c.classNo}${c.subclass}`.toUpperCase()
          );

          if (!classDef) {
            return {
              noClass: true
            };
          }

          if (value <= 0 || value > classDef.studentCount) {
            return {
              no: true
            };
          }
          return null;
        }),
        first()
      );
    };
  }
}
