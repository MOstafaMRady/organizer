import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function DateFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const date = moment(control.value, 'DD/MM/YYYY', true);
    const isValid = date.isValid();
    return !isValid && control.value ? {'invalidDate': {value: control.value}} : null;
  };
}
