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
  @Output() cancelledListener = new EventEmitter();
  @Output() itemSaved = new EventEmitter();
  form: FormGroup;

  @Input() selectedModel: any;

  selectedAttendees: any[] = [];
  selectedAppointments: any[] = [];
  title = '';

  isLoading: boolean;

  attendees: any[] = [];
  places: any[] = [];
  courses: any[] = [];

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
      place: ['', Validators.required],
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
    this.courseCrud.getAll(100, 1).subscribe(
      (data: any) => this.courses = data.courses,
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
    const data = {
      group: group,
      appointments: this.selectedAppointments
    };
    this.crud.save(data).subscribe(() => this.itemSaved.emit());
  }

  addToSelected() {
    const found = this.attendees.find((x: any) => x._id === this.form.value.selectedAttendee);
    const exist = this.selectedAttendees.find((x: any) => x._id === this.form.value.selectedAttendee);
    if (found && !exist) {
      this.selectedAttendees.push(found);
    }
  }

  filterCoursesByPlace(placeId?: any): any[] {
    if (placeId) {
      if (this.courses && this.courses.length > 0) {
        return this.courses.filter((x: any) => x.place && x.place._id === placeId);
      }
    }
    return [];
  }

  onCancel() {
    this.selectedModel = null;
    this.cancelledListener.emit();
  }

  removeAttendee(a: any) {
    const idx = this.selectedAttendees.indexOf(a);
    this.selectedAttendees.splice(idx, 1);
  }

  handleAppointments(data: any) {
    this.selectedAppointments = data;
  }
}
