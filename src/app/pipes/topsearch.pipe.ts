import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topsearch'
})
export class TopsearchPipe implements PipeTransform {

  transform(list: any, searchTerm: any) {
    if (!list) {
      return list;
    }
    let data = list.sort( function ( a, b ) { return b.results - a.results; } );
    return data.slice(0,5);
  }

}
