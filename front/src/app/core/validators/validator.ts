import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sanitizer(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = /[<>/"'`;{}]/g.test(control.value);
    return invalid ? { 'invalidchar': { value: control.value } } : null;  // Invertir aquí
  };
}