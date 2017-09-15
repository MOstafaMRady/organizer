import {Pipe, PipeTransform} from '@angular/core';
import {AttendeeFullNameService} from './attendee-full-name.service';

@Pipe({
  name: 'attendeesJoin'
})
export class AttendeesJoinPipe implements PipeTransform {
  constructor(private s: AttendeeFullNameService) {
  }

  transform(value: any[]): string {
    if (value && value.length > 0) {
      const names = value.map(x => this.s.getFullName(x));
      return names.join();
    }

    return '';
  }

}

