import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  getAll(): Observable<any[]> {
    return this.http.get('/api/groups').map(res => res.json());
  }

  save(data: any) {
    if (data.group._id && data.group._id.length > 5) {
      return this.http.put(`/api/group/${data.group._id}`, data, this.options);
    } else {
      delete data.group._id;
      return this.http.post('/api/group', data, this.options);
    }
  }

  remove(_id) {
    return this.http.delete('/api/group/' + _id, this.options);
  }

  checkCanDelete(id): Observable<number> {
    return this.http.get('/api/attendee/group/count/' + id).map(res => res.json());
  }
}

