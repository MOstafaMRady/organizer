import {Component, OnInit, TemplateRef} from '@angular/core';
import {GroupCrudService} from './group-crud.service';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  appointmentsGroup: any;
  selectedModel: any;
  groups: any[] = [];
  showEditor = false;
  public modalRef: BsModalRef;

  constructor(private crud: GroupCrudService, private router: Router, private modalService: BsModalService) {
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

  manageAppointments(g: any, template: TemplateRef<any>) {
    this.appointmentsGroup = g;
    this.modalRef = this.modalService.show(template);
  }
}
