import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any): string {
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
