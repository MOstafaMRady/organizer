import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});

  constructor(private http: Http) {

  }

  getPlaces(): Observable<any> {
    return this.http.get('/api/places').map(res => res.json());
  }

  add(place: any): Observable<any> {
    return this.http.post('/api/place', place, this.options);
    return this.http.post('/api/place', place);
  }

  edit(place: any) {
    return this.http.put(`/api/place/${place._id}`, place);
  }

  deletePlace(id: any): Observable<any> {
    return this.http.delete(`/api/place/${id}/checkAndDelete`);
    return this.http.put(`/api/place/${place._id}`, place, this.options);
  }
}
