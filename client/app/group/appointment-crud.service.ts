import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AppointmentCrudService {
  private headers = new Headers({'Content-Type': 'Application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  save(groupId: any, appointments: any[]) {
    return this.http.post('/api/group/' + groupId + '/appointments', {appointments: appointments}, this.options);
  }
}
