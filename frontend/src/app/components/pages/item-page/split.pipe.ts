import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(text: string, index: number = 0) {
    let arr = text.split("<br>");
    for (var index=0;index<arr.length;index++)
    return arr[index]
    return arr
  }


}
