import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {CourseCrudService} from '../course/course-crud.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  courses: any[] = [];
  count: number;
  pageNum = 1;
  pageSize = 3;

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses() {
    this.courseCrud.getAll(this.pageSize, this.pageNum)
      .subscribe((data: any) => {
        this.courses = this.courses.concat(data.courses);
        this.count = data.count;
      });
  }

  constructor(private courseCrud: CourseCrudService, @Inject(DOCUMENT) private document: Document) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.loadMore();
  }

  loadMore() {
    if (this.courses && this.courses.length === this.count) {
      return;
    }
    this.pageNum++;
    this.getCourses();
  }
}
