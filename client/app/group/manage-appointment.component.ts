import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {AppointmentCrudService} from './appointment-crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-group-appointments',
  templateUrl: 'manage-appointment.component.html'
})
export class ManageAppointmentComponent implements OnInit {
  @Output() appointmentsChanged = new EventEmitter();
  form: FormGroup;
  config: { format: string };
  days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  appointments: any[] = [];


  constructor(private fb: FormBuilder/*, private crudService: AppointmentCrudService*/) {
    this.config = {format: 'HH:SS A'};
    this.form = this.fb.group({
      day: [this.days[0], Validators.required],
      time: [new Date(), Validators.required],
    });
  }

  ngOnInit() {
  }

  addAppointment() {
    const appointment = {
      day: this.form.value.day,
      time: moment(this.form.value.time).format('HH:mm')
    };

    this.appointments.push(appointment);
    this.days.splice(this.days.indexOf(this.form.value.day), 1);
    this.setDefaultDay();
    this.appointmentsChanged.emit(this.appointments);
  }

  private setDefaultDay() {
    this.form.get('day').patchValue(this.days[0]);
  }

  removeAppointment(a: any) {
    this.appointments.splice(this.appointments.indexOf(a), 1);
    this.days.push(a.day);
    this.setDefaultDay();
    this.appointmentsChanged.emit(this.appointments);
  }
}
