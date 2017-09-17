import {Component, OnInit} from '@angular/core';
import {GroupCrudService} from './group-crud.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  appointmentsGroup: any;
  selectedModel: any;
  groups: any[] = [];
  showEditor = false;
  showAppointments = false;

  constructor(private crud: GroupCrudService, public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups() {
    this.crud.getAll()
      .subscribe((data: any[]) => this.groups = data);
  }

  startAdd() {
    this.showEditor = true;
  }

  startEdit(model: any) {
    this.showEditor = true;
    this.selectedModel = model;
  }

  deleteGroup(model: any) {
    this.crud.remove(model._id).subscribe(() => this.getGroups(), err => console.log(err));
  }

  onCancel() {
    this.showEditor = false;
  }

  onSave() {
    this.getGroups();
    this.showEditor = false;
  }

  manageAppointments(g: any) {
    this.showAppointments = true;
    this.appointmentsGroup = g;
  }

  /*appointmentsSaved(action: any) {
    if (action === 'saved') {
      this.toast.setMessage('Appointments saved successfully', 'success');
    }
  }*/
  hideAppointments() {
    this.showAppointments = false;
  }
}
