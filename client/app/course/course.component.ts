import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Place} from '../models/place/place.model';
import {PlaceCrudService} from '../place/place-crud.service';
import {CourseCrudService} from './course-crud.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  form: FormGroup;
  places: Place[];
  courses: any[];
  showEditor: boolean;

  constructor(private fb: FormBuilder, private placeCrudService: PlaceCrudService, private courseCrud: CourseCrudService) {
  }

  ngOnInit() {
    this.getCourses();

    this
      .placeCrudService
      .getPlaces()
      .subscribe(data => this.places = data,
        err => console.log(err));

    this.form = this.fb.group({_id: [], place: [], title: ['', [Validators.required]], description: [], cost: []});
  }

  private getCourses() {
    this.courseCrud.getAll()
      .subscribe(data => this.courses = data,
        err => console.log(err));
  }

  save() {
    const course = this.form.value;
    this.courseCrud.save(course)
      .subscribe(
        () => {
          this.hideAndResetForm();
          this.getCourses();
        },
        err => console.log(err));
  }

  startEdit(course: any) {
    this.resetModel();
    this.form.patchValue(course);
    this.form.get('place').patchValue(course.place._id);
    this.showForm();
  }

  private resetModel() {
    this.form.patchValue({_id: null, place: '', title: '', description: '', cost: ''});
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.resetModel();
    this.showForm();
  }

  hideAndResetForm() {
    this.resetModel();
    this.showEditor = false;
  }
}
