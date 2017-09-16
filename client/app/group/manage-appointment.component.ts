import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-appointments',
  templateUrl: 'manage-appointment.component.html'
})
export class ManageAppointmentComponent implements OnInit {
  @Input() group: any;
  form: FormGroup;
  config: { format: string };
  days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  appointments: any[] = [];

  constructor(private fb: FormBuilder) {
    this.config = {format: 'HH:SS A'};
    this.form = this.fb.group({
      day: [this.days[0], Validators.required],
      time: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
  }

  addAppointment() {
    this.appointments.push(this.form.value);
    this.days.splice(this.days.indexOf(this.form.value.day), 1);
    this.setDefaultDay();
  }

  private setDefaultDay() {
    this.form.get('day').patchValue(this.days[0]);
  }

  removeAppointment(a: any) {
    this.appointments.splice(this.appointments.indexOf(a), 1);
    this.days.push(a.day);
    this.setDefaultDay();
  }

  saveAppointments() {
    console.log(this.appointments);
  }
}







