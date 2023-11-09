import { Pipe, PipeTransform } from '@angular/core';
import { dilerss } from 'src/data';
interface dilers {
  imageSrc:string;
  name:string;
  dilerUrl:string;
  adr:string;
}
@Pipe({
  name: 'citySort'
})
export class CitySortPipe implements PipeTransform {

  transform(dilers: dilers[], sortBy: string): dilers[] {

   if ( sortBy === 'all') {return dilers;}
   else
     {
        //dilers.sort((e1, e2) => e1.name.localeCompare(e2.name));
        dilers = dilers.filter(obj => (obj.adr == sortBy));
      }
  console.log(dilers)

  return dilers;
}
}
