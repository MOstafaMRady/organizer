import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceCrudService {
  constructor(private http: Http) {

  }

  getPlaces(): Observable<any> {
    return this.http.get('/api/places').map(res => res.json());
  }
}
