import {Injectable} from '@angular/core';

@Injectable()
export class AttendeeFullNameService {
  getFullName(value: any) {
    let name = '';
    if (value.firstName) {
      name += value.firstName;
    }

    if (value.middleName && value.middleName.length > 0) {
      name += ` ${value.middleName}`;
    }

    if (value.lastName && value.lastName.length > 0) {
      name += ` ${value.lastName}`;
    }

    return name;
  }
}
