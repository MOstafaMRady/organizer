import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  title = '';
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Output() itemSaved = new EventEmitter();

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
      birthDate: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [],
      address: []
    });
    this.title = 'Add Attendee';
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
}
