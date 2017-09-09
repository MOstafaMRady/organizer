import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions(this.headers);

  constructor(private http: Http) {
  }

  getAll(): Observable<any[]> {
    return this.http.get('/api/groups').map(res => res.json());
  }

  save(group: any) {
    if (group._id && group._id.length > 5) {
      return this.http.put(`/api/group/${group._id}`, group, this.options);
    } else {
      delete group._id;
      return this.http.post('/api/group', group, this.headers);
    }
  }

  remove(_id) {
    return this.http.delete('/api/group/' + _id, this.options);
  }

  checkCanDelete(id): Observable<number> {
    return this.http.get('/api/attendee/group/count/' + id).map(res => res.json());
  }
}

