import { Injectable, Pipe, PipeTransform } from '@angular/core';

declare const dayjs: any;

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: Date | string, format?: string): string {
    if (!value) return '';
    const date = dayjs(value).utc().local();
    if (date.isBefore(dayjs().subtract(7, 'd'))) {
      return date.format(format);
    }
    return date.fromNow();
  }
}
