import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html'

})
export class AttendeeComponent implements OnInit {
  attendeeViewName: string;

  constructor() {
    this.attendeeViewName = 'created';
  }

  ngOnInit() {
  }

}
