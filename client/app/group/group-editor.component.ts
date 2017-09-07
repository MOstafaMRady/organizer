import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttendeeCrudService} from '../attendee/attendee-crud.service';
import {CourseCrudService} from '../course/course-crud.service';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html'
})
export class GroupEditorComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;
  attendees: any[] = [];
  cousrses: any[] = [];
  selectedAttendees: any[] = [];

  constructor(private fb: FormBuilder, private attendeeCrud: AttendeeCrudService, private courseCrud: CourseCrudService) {
  }

  ngOnInit() {
    this.attendeeCrud.getAll().subscribe(
      (data: any[]) => this.attendees = data,
      err => console.log(err),
      () => this.isLoading = false
    );

    this.courseCrud.getAll().subscribe(
      (data: any[]) => this.cousrses = data,
      err => console.log(err),
      () => this.isLoading = false
    );

    this.form = this.fb.group({
      name: ['', Validators.required],
      selectedAttendee: [''],
      course: ['', Validators.required]
    });
  }

  save() {
    console.log(this.form.value);
  }

  addToSelected() {
    const found = this.attendees.find((x: any) => x._id === this.form.value.selectedAttendee);
    const exist = this.selectedAttendees.find((x: any) => x._id === this.form.value.selectedAttendee);
    if (found && !exist) {
      this.selectedAttendees.push(found);
    }
  }
}
