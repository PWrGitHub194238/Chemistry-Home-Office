import { AbstractControl } from "@angular/forms";

export function Name(control: AbstractControl) {
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
}

export function StudentClass(control: AbstractControl) {
  const allowedClasses: string[] = ["7A", "7B", "8A", "8B", "1D"];
  const value = control.value as string;

  if (!control.value) {
    return null;
  }

  if (!allowedClasses.includes(value.toUpperCase())) {
    return {
      class: true
    };
  }
  return null;
}

export function StudentNo(control: AbstractControl) {
  const value = Number(control.value as string);

  if (!control.value) {
    return null;
  }

  if (isNaN(value) || value <= 0 || value >= 40) {
    return {
      no: true
    };
  }
  return null;
}
