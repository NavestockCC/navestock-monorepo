import { Injectable } from '@angular/core';
import { MatchDateFormat } from './match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchDateService {

  public dateFromString(dateStr: string, timeStr?: string): Date {
    const tmpDate: string[] = dateStr.split('/');
    if (timeStr == null || timeStr === '') {
      timeStr = '12:00';
    }
    return new Date(
      tmpDate[2] +
        '-' +
        tmpDate[1] +
        '-' +
        tmpDate[0] +
        'T' +
        timeStr +
        ':00+01:00'
    );
  }

  public getWeek(dateStr: Date): number {
    const ND = dateStr;
    const onejan = new Date(ND.getFullYear(), 0, 1);
    return Number(
      ND.getFullYear().toString() +
        Math.ceil(
          ((ND.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
            7
        ).toString()
    );
  }

  public toTimeStamp(dateStr: string, timeStr?: string): MatchDateFormat {
    const ND = this.dateFromString(dateStr, timeStr);
    const week = this.getWeek(ND);
    return {
      DateTime: ND,
      MonthYear:
        ND.toLocaleString('default', { month: 'long' }) +
        ' ' +
        ND.getFullYear().toString(),
      WeekYear: week,
      WeekDate: this.getStartEndDateforWeek(ND)
    };
  }

  private getMonday(d: Date) {
    const day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private getSunday(d: Date) {
    const day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? 0 : 7); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  public getStartEndDateforWeek(d: Date): string {
    d = new Date(d);

    const month = [];
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'Mar';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'Jun';
    month[6] = 'Jul';
    month[7] = 'Aug';
    month[8] = 'Sep';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';

    return (
      this.getMonday(d).getDate().toString() +
      ' ' +
      month[this.getMonday(d).getMonth()] +
      ' to ' +
      this.getSunday(d).getDate().toString() +
      ' ' +
      month[this.getSunday(d).getMonth()] +
      ' ' +
      d.getFullYear().toString()
    );
  }

/**
 * Gets current year
 * @returns current year as a string 
 */
public getCurrentYear():string {
    const today =  new Date(Date.now());
    return today.getFullYear().toString();
  }

}
