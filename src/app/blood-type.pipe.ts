import { Pipe, PipeTransform } from '@angular/core';
import { bloodGroupItems } from './utillity/constant';

@Pipe({
  name: 'bloodType'
})
export class BloodTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return bloodGroupItems.filter(b => b.id === value)[0].name;
  }

}
