import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueToString'
})
export class ValueToStringPipe implements PipeTransform {

  transform(value: object): string | null {
    if (!value) return null;
    const stringValue = JSON.stringify(value, null, '\t');
    return stringValue;
  }

}
