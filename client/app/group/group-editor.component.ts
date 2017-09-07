import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttendeeCrudService} from '../attendee/attendee-crud.service';
import {CourseCrudService} from '../course/course-crud.service';
import {PlaceCrudService} from '../place/place-crud.service';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html'
})
export class GroupEditorComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;
  attendees: any[] = [];
  places: any[] = [];
  courses: any[] = [];
  selectedAttendees: any[] = [];

  constructor(private fb: FormBuilder,
              private attendeeCrud: AttendeeCrudService,
              private placeCrud: PlaceCrudService,
              private courseCrud: CourseCrudService) {
  }

  ngOnInit() {
    this.getAttendees();
    this.getPlaces();
    this.getCourses();
    this.prepareForm();
  }

  prepareForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      selectedAttendee: [''],
      place: [''],
      course: ['', Validators.required]
    });
  }

  getCourses() {
    this.courseCrud.getAll().subscribe(
      (data: any[]) => this.courses = data,
      err => console.log(err),
      () => this.isLoading = false
    );
  }

  getPlaces() {
    this.placeCrud.getPlaces().subscribe(
      (data: any[]) => this.places = data,
      err => console.log(err),
      () => this.isLoading = false
    );
  }

  getAttendees() {
    this.attendeeCrud.getAll().subscribe(
      (data: any[]) => this.attendees = data,
      err => console.log(err),
      () => this.isLoading = false
    );
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

  filterCoursesByPlace(placeId: any): any[] {
    if (!placeId) {
      return [];
    }
    return this.courses.filter((x: any) => x.place && x.place._id === placeId);
  }
}
