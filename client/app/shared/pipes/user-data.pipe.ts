import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userData'
})
export class UserDataPipe implements PipeTransform {
  transform(value: any): string {
    let name = '';
    if (value.username) {
      name += value.username;
    }
    if (value.email) {
      name += `, (e-mail: ${value.email})`;
    }

    return name;
  }

}
