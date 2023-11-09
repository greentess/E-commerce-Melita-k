import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/shared/models/Item';
import { Observable } from 'rxjs';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(filter_items: Item[], sortBy: string): Item[] {
    var order = sortBy.charAt(0) == "-" ? 'desc' : "asc";
    if ( sortBy === undefined || sortBy === 'id') {
      filter_items.sort((e1, e2) => e1.id.localeCompare(e2.id));
      } else if ( sortBy === 'name') {
        filter_items.sort((e1, e2) => e1.name.localeCompare(e2.name));
      }
      console.log(filter_items)
      if (order==='desc')
      return filter_items.reverse();
      else
      return filter_items;
}
}
