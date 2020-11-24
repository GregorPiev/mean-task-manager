import { DatePipe } from '@angular/common';
import { isNumeric } from 'rxjs/internal/util/isNumeric';

export class HttpUtils {

  static objToJSONString(obj: any): string {
    let datePipe: DatePipe = new DatePipe('en-US');
    let str: string = '';
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (isNumeric(obj[p])) {
          str += "\"" + p + "\":\"" + obj[p] + "\",";
        } else if (typeof (obj[p]) === 'boolean') {
          str += "\"" + p + "\":" + obj[p] + ",";
        } else if (obj[p]) {
          if (obj[p] instanceof Date) {
            str += "\"" + p + "\":" + datePipe.transform(obj[p], 'yyyy-MM-dd') + "\",";
          } else {
            str += "\"" + p + "\":" + obj[p] + "\",";
          }
        }
      }
    }
    if (str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
  }
}
