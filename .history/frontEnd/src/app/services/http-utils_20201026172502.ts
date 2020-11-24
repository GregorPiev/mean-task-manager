import { DatePipe } from '@angular/common';
import { isNumeric } from 'rxjs/internal/util/isNumeric';

export class HttpUtils {

  static objToJSONString(obj: any): string {
    let datePipe: DatePipe = new DatePipe('en-US');
  }
}
