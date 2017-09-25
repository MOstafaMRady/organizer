import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CourseCrudService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({
    headers: this.headers
  });

  constructor(private http: Http) {
  }

  getAll(pageSize?: number, pageNumber?: number): Observable<any[]> {
    return this.http.get('/api/courses?pageSize=' + pageSize + '&pageNum=' + pageNumber).map(res => res.json());
  }

  save(course: any) {
    if (course._id) {
      return this.http.put(`/api/update-course/${course._id}`, course, this.options);
    } else {
      return this.http.post('/api/course', course, this.options);
    }
  }

  removeCourse(c: any) {
    return this.http.delete('/api/course/' + c._id);
  }
}
