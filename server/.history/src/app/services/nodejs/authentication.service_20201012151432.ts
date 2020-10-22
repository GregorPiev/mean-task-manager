import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultObjectVo } from '../../vo/result-object-vo';

@Injectable({
  providedIn: 'root'
})
const servicePrefix: string = '/nodejs/';
export class AuthenticationService {
  options: object;

  constructor(private http: HttpClient) {
    let optionHeaders: HttpHeaders = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    this.options = { headers: optionHeaders }
  }

  authenticate(username: string, password: string): Observable<any> {
    let parameters: string = 'username' + '=' + username + '&';
    parameters += 'password' + '=' + Md5.hashStr(password);
    return of();
  }
}
