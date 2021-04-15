import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate'
})
export class UTCDatePipe implements PipeTransform {

  transform(value: string): any {

    if (!value) {
      return '';
    }

    if (!value.endsWith('Z')) {
      value += 'Z';
    }

    let dateValue = new Date(value);

    return dateValue;
  }
}
