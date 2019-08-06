import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nl2br' })
export class Nl2brPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';
  }
}
