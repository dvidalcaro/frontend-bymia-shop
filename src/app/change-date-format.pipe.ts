import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDateFormat'
})
export class ChangeDateFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
