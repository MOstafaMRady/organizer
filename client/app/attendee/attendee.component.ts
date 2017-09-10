import {Component, OnInit} from '@angular/core';
import {AttendeeCrudService} from './attendee-crud.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {GroupCrudService} from '../group/group-crud.service';

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

  constructor(private attendeeCrudSvc: AttendeeCrudService,
              public toast: ToastComponent,
              private groupCrud: GroupCrudService) {
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
    this.showForm();
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
    this.toast.setMessage('Item saved successfully.', 'success');
    this.getAttendees();
    this.hideAndResetForm();
  }

  onCancel() {
    this.showEditor = false;
  }

  deleteAttendee(_id: any) {
    this.groupCrud.checkCanDelete(_id).subscribe((count: number) => {
      if (count < 1) {
        this.attendeeCrudSvc.deleteAttendee(_id).subscribe(() => this.getAttendees());
      } else {
        this.toast.setMessage('Can\'t remove, is joining (' + count + ') group(s)!', 'danger');
      }
    });
  }
}
