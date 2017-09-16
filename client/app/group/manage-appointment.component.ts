import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-group-appointments',
  templateUrl: 'manage-appointment.component.html'
})
export class ManageAppointmentComponent implements OnInit {
  @Input() group: any;
  form: FormGroup;
  config: {
    format: string;
  };
  days = ['sat', 'sun', 'mon'];

  constructor(private fb: FormBuilder) {
    this.config = {format: 'HH:SS'};
    this.form = this.fb.group({
      day: [],
      time: [new Date()]
    });
  }

  ngOnInit() {
  }


}
