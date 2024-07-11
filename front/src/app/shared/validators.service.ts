import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as types from './types'

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  emailValidator(control: AbstractControl): ValidationErrors | null {
   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value );
    
    return valid? null : { 'invalidEmail': { value: control.value } };
  }

  requiredValidator(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { 'required': true };
  }

}
