import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const seconds = Number(value);
    if (isNaN(seconds)){
      return "Invalid input";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedTime = `${this.pad(hours)}:${this.pad(minutes)}`;
    return formattedTime;

  }
  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
