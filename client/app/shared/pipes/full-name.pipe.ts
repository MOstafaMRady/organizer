import {Pipe, PipeTransform} from '@angular/core';
import {AttendeeFullNameService} from './attendee-full-name.service';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  constructor(private s: AttendeeFullNameService) {
  }

  transform(value: any): string {
    return this.s.getFullName(value);
  }
}
