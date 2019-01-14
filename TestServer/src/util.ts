import moment from 'moment';
import { Moment } from 'moment';

export class UtilFn {
    static getFiscalYear(date: Date) {
        const mDate: Moment = moment(date).locale('th');
        const year: number = mDate.year()
        const month: number = mDate.month() + 1;
        if (month >= 10) {
          return year;
        } else {
          return year - 1;
        }
    }
}
