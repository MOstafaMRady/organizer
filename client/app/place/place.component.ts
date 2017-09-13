import {Component, OnInit} from '@angular/core';
import {PlaceCrudService} from './place-crud.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {
  formTitle: string;
  places: any[];
  isLoading: boolean;
  showEditor = false;
  selectedModel: any;

  constructor(private placeCrudSvc: PlaceCrudService,
              public toast: ToastComponent) {
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

  save(place: any) {
    this.isLoading = true;
    const observable = place._id ? this.placeCrudSvc.edit(place) : this.placeCrudSvc.add(place);
    observable.subscribe(() => {
        this.getPlaces();
        this.toast.setMessage('Place saved successfully', 'success');
      }, error => console.log(error),
      () => {
        this.showEditor = false;
        this.isLoading = false;
      });
  }

  startEdit(place: any) {
    this.selectedModel = place;
    this.formTitle = 'Edit Place';
    this.showForm();
  }

  deletePlace(id: any) {
    this.isLoading = true;
    this.placeCrudSvc
      .deletePlace(id)
      .subscribe(res => {
        if (res.status === 200) {
          this.toast.setMessage('Place removed successfully', 'success');
          this.getPlaces();
        }
      }, err => {
        if (err.status === 409) {
          this.toast.setMessage(JSON.parse(err._body).msg, 'danger');
          this.isLoading = false;
        }
        console.log(err);
      });
  }

  showForm() {
    this.showEditor = true;
  }

  startAdd() {
    this.selectedModel = null;
    this.formTitle = 'Add Place';
    this.showForm();
  }

  hideAndResetForm() {
    this.showEditor = false;
  }
}
