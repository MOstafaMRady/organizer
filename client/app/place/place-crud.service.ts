import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {

  }

  getPlaces(): Observable<any> {
    return this.http.get('/api/places').map(res => res.json());
  }

  add(place: any): Observable<any> {
    return this.http.post('/api/place', place, this.options);
  }

  edit(place: any) {
    return this.http.put(`/api/place/${place._id}`, place, this.options);
  }
}
