import {Component, OnInit} from '@angular/core';
import {AttendeeCrudService} from './attendee-crud.service';


@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html'

})
export class AttendeeComponent implements OnInit {
  formTitle: string;
  showEditor = false;
  attendees: any[];

  constructor(private attendeeCrudSvc: AttendeeCrudService) {
  }

  ngOnInit() {
    this.attendeeCrudSvc.getAll().subscribe(data => this.attendees = data);
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.formTitle = 'Add Attendee';
    this.showForm();
    // this.resetModel();
    this.showForm();
    // this.setFocusedEl();
  }

  startEdit() {
    this.formTitle = 'Edit Attendee';
  }

  save() {
  }

  hideAndResetForm() {
    this.showEditor = false;
  }

  onSaved(data) {
    console.log(data);
    this.hideAndResetForm();
  }

  getFullName(attendee: any): string {
    let fullName = `${attendee.firstName} `;
    if (attendee.middleName && attendee.middleName.length > 0) {
      fullName += `${attendee.middleName} `;
    }
    fullName += `${attendee.lastName}`;
    return fullName;
  }

  onCancel() {
    this.showEditor = false;
  }
}
