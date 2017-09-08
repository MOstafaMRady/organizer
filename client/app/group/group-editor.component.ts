import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttendeeCrudService} from '../attendee/attendee-crud.service';
import {CourseCrudService} from '../course/course-crud.service';
import {PlaceCrudService} from '../place/place-crud.service';
import {GroupCrudService} from './group-crud.service';

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
  @Output() cancelledListener = new EventEmitter();
  @Output() itemSaved = new EventEmitter();
  @Input() selectedModel: any;
  title = '';
  constructor(private fb: FormBuilder,
              private crud: GroupCrudService,
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
    this.title = 'Add Group';
    this.form = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      selectedAttendee: [''],
      place: [''],
      course: ['', Validators.required]
    });
    if (this.selectedModel) {
      this.title = 'Edit Group';
      this.form.get('_id').patchValue(this.selectedModel._id);
      this.form.get('name').patchValue(this.selectedModel.name);
      this.form.get('place').patchValue(this.selectedModel.course.place._id);
      this.selectedAttendees = this.selectedModel.attendees;
      this.form.get('course').patchValue(this.selectedModel.course._id);
    }
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
    const group = this.form.value;
    group.attendees = this.selectedAttendees.map((m: any) => m._id);
    this.crud.save(group).subscribe(() => this.itemSaved.emit());
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

  onCancel() {
    this.selectedModel = null;
    this.cancelledListener.emit();
  }

  removeAttendee(a: any) {
    const idx = this.selectedAttendees.indexOf(a);
    this.selectedAttendees.splice(idx, 1);
  }
}
