import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as _v} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DateFormatValidator} from '../shared/validators/date-format.validator';
import {CourseCrudService} from '../course/course-crud.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AttendeeCrudService} from '../attendee/attendee-crud.service';
import {GenderData} from '../shared/gender-data.service';

@Component({
  templateUrl: './course-registration.component.html'
})
export class CourseRegistrationComponent implements OnInit {
  course: any;
  form: FormGroup;
  genderData = [];
  config = {format: 'DD/MM/YYYY'};

  constructor(private fb: FormBuilder,
              private courseCrud: CourseCrudService,
              private router: Router,
              private userService: UserService,
              private attendeeCrud: AttendeeCrudService,
              private genderDataService: GenderData) {
    this.prepareForm();
    this.genderData = this.genderDataService.genderData;
  }

  ngOnInit(): void {
    if (this.courseCrud.registrationCourse) {
      this.course = this.courseCrud.registrationCourse;
    } else {
      this.router.navigateByUrl('/');
    }
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

  save() {
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      role: 'user'
    };
    this.userService.register(user).subscribe(() => {
      const vale = this.form.value;
      const attendee = {
        firstName: vale.firstName,
        middleName: vale.middleName,
        lastName: vale.lastName,
        gender: vale.gender,
        birthDate: vale.birthDate,
        phone1: vale.phone1,
        phone2: vale.phone2,
        address: vale.address
      };
      this.attendeeCrud.save(attendee).subscribe(() => alert('hoba'));
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
