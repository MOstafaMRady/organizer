import {Component, OnInit} from '@angular/core';
import {CourseCrudService} from '../course/course-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  courses: any[] = [];

  ngOnInit(): void {
    this.courseCrud.getAll().subscribe(data => this.courses = data);
  }

  constructor(private courseCrud: CourseCrudService) {

  }


}
