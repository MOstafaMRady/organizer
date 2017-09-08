import {Component, OnInit} from '@angular/core';
import {GroupCrudService} from './group-crud.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  selectedModel: any;
  groups: any[] = [];
  showEditor = false;

  constructor(private crud: GroupCrudService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups() {
    this.crud.getAll().subscribe((data: any[]) => this.groups = data);
  }

  startAdd() {
    this.showEditor = true;
  }

  startEdit(model: any) {
    this.showEditor = true;
    this.selectedModel = model;
  }

  onCancel() {
    this.showEditor = false;
  }

  onSave() {
    this.getGroups();
    this.showEditor = false;
  }
}
