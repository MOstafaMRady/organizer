import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AttendeeCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  getAll(): Observable<any[]> {
    return this.http.get('/api/attendees').map(res => res.json());
  }

  save(attendee: any): Observable<any> {
    if (attendee._id && attendee._id.length > 5) {
      return this.http.put(`/api/attendee/${attendee._id}`, attendee, this.options);
    } else {
      return this.http.post('/api/attendee', attendee, this.options);
    }
  }

  deleteAttendee(_id: any) {
    return this.http.delete(`/api/attendee/${_id}`);
  }
}
