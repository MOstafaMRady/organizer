import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators as _v} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DateFormatValidator} from '../shared/validators/date-format.validator';

@Component({
  templateUrl: './course-registration.component.html'
})
export class CourseRegistrationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.prepareForm();
  }

  prepareForm() {
    const pattern = '[a-zA-Z0-9_-\\s]*';
    this.form = this.fb.group({
      username: ['', [_v.required, _v.minLength(2), _v.maxLength(30), _v.pattern(pattern)]],
      email: ['', [_v.required, _v.minLength(3), _v.maxLength(100)]],
      password: ['', [_v.required, _v.minLength(6)]],
      firstName: ['', _v.required],
      middleName: [''],
      lastName: ['', _v.required],
      gender: ['', _v.required],
      birthDate: ['', [_v.required, DateFormatValidator()]],
      phone1: ['', [_v.required, CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      phone2: ['', [CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      address: ['']
    });
  }
}
