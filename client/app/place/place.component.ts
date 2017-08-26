import {Component, OnInit} from '@angular/core';
import {PlaceCrudService} from './place-crud.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {
  places: any[];
  isLoading: boolean;

  constructor(private placeCrudSvc: PlaceCrudService) {
  }

  ngOnInit() {
    this.placeCrudSvc.getPlaces()
      .subscribe(data =>
          this.places = data,
        error => console.log(error),
        () => this.isLoading = false);
  }
}
