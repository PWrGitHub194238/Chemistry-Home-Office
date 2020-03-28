import { AbstractControl } from "@angular/forms";

export function NoEmail(control: AbstractControl) {
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
}

export function StudentClass(control: AbstractControl) {
  const allowedClasses: string[] = ["7A", "7B", "8A", "8B"];
  const value = (control.value as string).toUpperCase();

  if (!allowedClasses.includes(value)) {
    return {
      class: true
    };
  }
  return null;
}

export function StudentNo(control: AbstractControl) {
  const value = Number(control.value as string);

  if (isNaN(value) || value <= 0 || value >= 40) {
    return {
      no: true
    };
  }
  return null;
}
