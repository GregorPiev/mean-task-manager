import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultObjectVo } from '../../vo/result-object-vo';
import { Md5 } from 'ts-md5/dist/md5';



const servicePrefix: string = '/nodejs/';
@Injectable({
  providedIn: 'root',
})
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
    parameters += '&method==authenticate';
    const url = servicePrefix + 'login?' + parameters;
    return this.http.get(url);
  }
}
