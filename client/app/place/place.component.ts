import {Component, OnInit} from '@angular/core';
import {PlaceCrudService} from './place-crud.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {
  formTitle: string;
  places: any[];
  isLoading: boolean;
  form: FormGroup;
  showEditor = false;


  constructor(private placeCrudSvc: PlaceCrudService,
              public toast: ToastComponent,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      _id: [],
      name: ['', Validators.required],
      phone1: ['', [Validators.required, CustomValidators.number, CustomValidators.rangeLength([5, 11])]],
      phone2: this.addPhoneControl(),
      phone3: this.addPhoneControl(),
      address: ['', Validators.required]
    });
  }

  addPhoneControl() {
    return this.fb.control('', [CustomValidators.number, CustomValidators.rangeLength([6, 11])]);
  }

  ngOnInit() {
    this.getPlaces();
  }

  private getPlaces() {
    this.isLoading = true;
    this.placeCrudSvc.getPlaces()
      .subscribe(data =>
          this.places = data,
        error => console.log(error),
        () => this.isLoading = false);
  }

  save() {
    this.isLoading = true;
    const place = this.form.value;
    const observable = place._id ? this.placeCrudSvc.edit(place) : this.placeCrudSvc.add(place);
    observable.subscribe(() => this.getPlaces(), error => console.log(error), () => this.showEditor = false);
  }

  startEdit(place: any) {
    this.formTitle = 'Edit Place';
    this.resetModel();
    this.form.patchValue(place);
    this.showForm();
  }

  delete(id: any) {
    this.isLoading = true;
    this.placeCrudSvc.deletePlace(id).subscribe((res) => {
      this.toast.setMessage('Place removed successfully', 'success');
      this.getPlaces();
    }, (err => {
      console.log(err);
    }), () => this.isLoading = false);
  }

  private resetModel() {
    this.form.patchValue({_id: null, name: '', phone1: '', phone2: '', phone3: '', address: ''});
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.formTitle = 'Add Place';
    this.resetModel();
    this.showForm();
  }

  hideAndResetForm() {
    this.resetModel();
    this.showEditor = false;
  }
}
