import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenderData} from '../shared/gender-data.service';
import {AttendeeCrudService} from './attendee-crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-attendee-editor',
  templateUrl: './attendee-editor.component.html'
})
export class AttendeeEditorComponent {
  config: {
    format: string;
  };
  genderData: string[];
  form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor(private fb: FormBuilder,
              private attendeeCrudSvc: AttendeeCrudService,
              private genderDataService: GenderData) {
    this.config = {format: 'DD/MM/YYYY'};
    this.genderData = this.genderDataService.genderData;
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [],
      address: []
    });
  }

  save() {
    const attendee = this.form.value;
    attendee.birthDate = moment(this.form.value.birthDate);
    this.attendeeCrudSvc.save(attendee).subscribe((data) => this.saved.emit(data));
  }

  cancel() {
    this.cancelled.emit();
  }
}