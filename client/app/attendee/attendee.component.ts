import {Component, OnInit} from '@angular/core';
import {AttendeeCrudService} from './attendee-crud.service';
import {ToastComponent} from '../shared/toast/toast.component';


@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html'

})
export class AttendeeComponent implements OnInit {
  isLoading = false;
  formTitle: string;
  showEditor = false;
  attendees: any[];
  selectedModel: any = null;

  constructor(private attendeeCrudSvc: AttendeeCrudService, public toast: ToastComponent) {
  }

  getFullName(attendee: any): string {
    let fullName = `${attendee.firstName} `;
    if (attendee.middleName && attendee.middleName.length > 0) {
      fullName += `${attendee.middleName} `;
    }
    fullName += `${attendee.lastName}`;
    return fullName;
  }

  ngOnInit() {
    this.getAttendees();
  }

  getAttendees() {
    this.isLoading = true;
    this.attendeeCrudSvc.getAll()
      .subscribe(
        data => this.attendees = data,
        error => console.log(error),
        () => this.isLoading = false
      );
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.selectedModel = null;
    this.formTitle = 'Add Attendee';
    this.showForm();
    // this.resetModel();
    this.showForm();
    // this.setFocusedEl();
  }

  startEdit(model: any) {
    this.selectedModel = model;
    this.formTitle = 'Edit Attendee';
    this.showForm();
  }

  hideAndResetForm() {
    this.showEditor = false;
  }

  onSaved() {
    this.toast.setMessage('Item added successfully.', 'success');
    this.getAttendees();
    this.hideAndResetForm();
  }

  onCancel() {
    this.showEditor = false;
  }
}
