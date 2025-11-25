import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activefilter'
})
export class ActivefilterPipe implements PipeTransform {

  transform(list: any, searchTerm: any) {
    if (!list) {
      return list;
    }
    if (searchTerm == "none") {
      return list;
    }
    return list.filter(user => user.status == searchTerm);
  }

}
