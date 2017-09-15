import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenderData} from '../shared/gender-data.service';
import {AttendeeCrudService} from './attendee-crud.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import {CustomValidators} from 'ng2-validation';
import {DateFormatValidator} from '../shared/validators/date-format.validator';

@Component({
  selector: 'app-attendee-editor',
  templateUrl: './attendee-editor.component.html'
})
export class AttendeeEditorComponent implements OnInit {
  config: {
    format: string;
  };

  genderData: string[];
  form: FormGroup;
  title = '';
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Output() itemSaved = new EventEmitter();
  users: any[] = [];
  selectedUser: any;

  @Input()
  set model(value: any) {
    if (!value) {
      this.title = 'Add Attendee';
      return;
    }
    this.title = 'Edit Attendee';
    this.form.patchValue(value);
    const birthDateFormatted = moment(value.birthDate).format('DD/MM/YYYY');
    this.form.get('birthDate').patchValue(birthDateFormatted);
    if (value.user && value.user._id) {
      this.selectedUser = value.user;
      this.form.get('user').patchValue(value.user._id);
    }
  }

  constructor(private fb: FormBuilder,
              private attendeeCrudSvc: AttendeeCrudService,
              private genderDataService: GenderData) {
    this.config = {format: 'DD/MM/YYYY'};
    this.genderData = this.genderDataService.genderData;
    this.form = this.fb.group({
      _id: [],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', [Validators.required, DateFormatValidator()]],
      phone1: ['', [Validators.required, CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      phone2: ['', [CustomValidators.number, CustomValidators.rangeLength([6, 11])]],
      address: [''],
      user: ['']
    });
    this.title = 'Add Attendee';
  }

  ngOnInit(): void {
    this.attendeeCrudSvc.getUsers()
      .subscribe(users => {
        this.attendeeCrudSvc.getAll().subscribe((attendees: any) => {
          const attnUsers = _.filter(attendees, x => x.user).map(x => x.user);
          this.users = _.filter(users, u => (_.findIndex(attnUsers, a => a._id === u._id)) < 0);
          if (this.selectedUser) {
            this.users.push(this.selectedUser);
          }
        });
      });
  }

  save() {
    const attendee = this.form.value;
    attendee.birthDate = moment(this.form.value.birthDate, 'DD/MM/YYYY').toDate();
    this.attendeeCrudSvc.save(attendee).subscribe((data) => this.saved.emit(data));
    this.itemSaved.emit();
  }

  cancel() {
    this.cancelled.emit();
  }

  unbindUser() {
    this.form.get('user').patchValue(null);
  }
}
