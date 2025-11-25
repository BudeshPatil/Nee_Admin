import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(users: any, searchTerm: string) {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user => user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
