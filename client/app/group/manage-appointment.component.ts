import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppointmentCrudService} from './appointment-crud.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-group-appointments',
  templateUrl: 'manage-appointment.component.html'
})
export class ManageAppointmentComponent implements OnInit {
  @Input() group: any;
  @Output() actionTaken = new EventEmitter();

  form: FormGroup;
  config: { format: string };
  days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  appointments: any[] = [];

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown = false;

  constructor(private fb: FormBuilder, private crudService: AppointmentCrudService) {
    this.config = {format: 'HH:SS A'};
    this.form = this.fb.group({
      day: [this.days[0], Validators.required],
      time: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.showModal();
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
    if (!this.appointments || this.appointments.length < 1) {
      alert('Please add one or more appointments.');
      return;
    }
    this.crudService.save(this.group._id, this.appointments).subscribe(data => {
      this.actionTaken.emit('saved');
      this.hideModal();
    });
  }


  /* Modal stuff*/

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.actionTaken.emit('cancelled');
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.actionTaken.emit('cancelled');
    this.isModalShown = false;
  }
}
