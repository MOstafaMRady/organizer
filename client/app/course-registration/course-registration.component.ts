import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as _v} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DateFormatValidator} from '../shared/validators/date-format.validator';
import {CourseCrudService} from '../course/course-crud.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AttendeeCrudService} from '../attendee/attendee-crud.service';
import {GenderData} from '../shared/gender-data.service';
import {GroupCrudService} from '../group/group-crud.service';
import * as moment from 'moment';

@Component({
  templateUrl: './course-registration.component.html'
})
export class CourseRegistrationComponent implements OnInit {
  course: any;
  form: FormGroup;
  genderData = [];
  config = {format: 'DD/MM/YYYY'};
  groups = [];

  constructor(private fb: FormBuilder,
              private courseCrud: CourseCrudService,
              private router: Router,
              private userService: UserService,
              private attendeeCrud: AttendeeCrudService,
              private genderDataService: GenderData, private groupCrud: GroupCrudService) {
    this.prepareForm();
    this.genderData = this.genderDataService.genderData;
  }

  ngOnInit(): void {
    if (this.courseCrud.registrationCourse) {
      this.course = this.courseCrud.registrationCourse;
    } else {
      this.router.navigateByUrl('/');
      return;
    }
    this.groupCrud.getAll().subscribe((data: any[]) => {
      this.groups = data.filter((x: any) => x.course._id === this.course._id);
    });
  }

  prepareForm() {
    const pattern = '[a-zA-Z0-9_-\\s]*';
    this.form = this.fb.group({
      username: ['x23xx', [_v.required, _v.minLength(2), _v.maxLength(30), _v.pattern(pattern)]],
      email: ['xxx23@xxx', [_v.required, _v.minLength(3), _v.maxLength(100)]],
      password: ['123qwe', [_v.required, _v.minLength(6)]],
      firstName: ['XxX', _v.required],
      middleName: [''],
      lastName: ['terst', _v.required],
      gender: ['Male', _v.required],
      birthDate: ['25/01/2011', [_v.required, DateFormatValidator()]],
      phone1: ['01000000', [_v.required, CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      phone2: ['', [CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      address: ['Holland'],
      group: [''],
      course: [this.course ? this.course._id : null]
    });
  }

  save() {
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      role: 'user'
    };

    this.userService.register(user).subscribe((savedUser: any) => {
      const attendeeToSave = this.form.value;
      const attendee = {
        firstName: attendeeToSave.firstName,
        middleName: attendeeToSave.middleName,
        lastName: attendeeToSave.lastName,
        gender: attendeeToSave.gender,
        birthDate: moment(attendeeToSave.birthDate, 'DD/MM/YYYY').toDate(),
        phone1: attendeeToSave.phone1,
        phone2: attendeeToSave.phone2,
        address: attendeeToSave.address,
        user: savedUser._id
      };

      this.attendeeCrud.save(attendee)
        .subscribe((savedAttendee) => {
          const attendeeId = JSON.parse(savedAttendee._body)._id;
          const toSend = {
            attendee: attendeeId,
            course: this.course._id,
            group: this.form.value.group ? this.form.value.group : null
          };
          this.attendeeCrud.addToCourseGroup(toSend).subscribe(data => console.log(data));
        });
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
