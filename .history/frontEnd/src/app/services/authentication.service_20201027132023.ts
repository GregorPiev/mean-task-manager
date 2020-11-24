import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultObjectVo } from '../vo/result-object-vo';
import { Md5 } from 'ts-md5/dist/md5';

const servicePrefix: string = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  options: object;

  constructor(private http: HttpClient) {
    let optionHeaders: HttpHeaders = new HttpHeaders();
    optionHeaders.set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
    optionHeaders.set('Content-type', 'application/json')
    optionHeaders.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    optionHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
    optionHeaders.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type')
    this.options = { headers: optionHeaders };
  }

  authenticate(username: string, password: string): Observable<any> {
    let parameters: string = 'username' + '=' + username + '&';
    parameters += 'password' + '=' + Md5.hashStr(password);
    parameters += '&method=authenticate';
    const url = servicePrefix + 'login?' + parameters;
    return this.http.get(url, this.options);
  }
}
