import {Component, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Place} from '../models/place/place.model';
import {PlaceCrudService} from '../place/place-crud.service';
import {CourseCrudService} from './course-crud.service';
import {CustomValidators} from 'ng2-validation';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  formTitle: string;
  form: FormGroup;
  places: Place[];
  courses: any[];
  showEditor: boolean;
  @ViewChildren('titleElInput') titleElInput: QueryList<any>;
  isLoading = false;

  constructor(private fb: FormBuilder, private placeCrudService: PlaceCrudService,
              private courseCrud: CourseCrudService, private w: NgZone, public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getCourses();
    this.placeCrudService
      .getPlaces()
      .subscribe(data => this.places = data,
        err => console.log(err));

    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      _id: [],
      place: ['', Validators.required],
      title: ['', [Validators.required]],
      description: [],
      cost: [null, [Validators.required, CustomValidators.number, CustomValidators.min(0)]]
    });
  }

  private getCourses() {
    this.isLoading = true;
    this.courseCrud.getAll()
      .subscribe(data => {
          this.courses = data;
          this.isLoading = false;
        },
        err => console.log(err));
  }

  save() {
    const course = this.form.value;
    this.courseCrud.save(course)
      .subscribe(
        () => {
          this.toast.setMessage('Saved successfully', 'success');
          this.hideAndResetForm();
          this.getCourses();
        },
        err => console.log(err));
  }

  startEdit(course: any) {
    this.formTitle = 'Edit course';
    this.resetModel();
    this.form.patchValue(course);
    this.form.get('place').patchValue(course.place._id);
    this.showForm();
    this.setFocusedEl();
  }

  private resetModel() {
    this.form.patchValue({
      _id: null,
      place: '',
      title: '',
      description: '',
      cost: ''
    });
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.formTitle = 'Add course';
    this.resetModel();
    this.showForm();
    this.setFocusedEl();
  }

  setFocusedEl() {
    this.w.runOutsideAngular(() => {
      setTimeout(() => {
        try {
          this.titleElInput.first.nativeElement.focus();
        } finally {
        }
      });
    });
  }

  hideAndResetForm() {
    this.resetModel();
    this.showEditor = false;
  }

  removeCourse(c: any) {
    this.courseCrud.removeCourse(c).subscribe((res) => {
      this.toast.setMessage('Removed successfully', 'danger');
      this.getCourses();
    }, err => {
      if (err && err.status === 409) {
        const body = JSON.parse(err._body);
        this.toast.setMessage(`course is in use in group(s), ${body.map(x => x.name).join()}`, 'danger');
      }
    });
  }
}
