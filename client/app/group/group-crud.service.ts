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
    if (group._id) {
      return this.http.put(`/api/group/${group._id}`, group, this.options);
    } else {
      return this.http.post('/api/group', group, this.headers);
    }
  }
}

