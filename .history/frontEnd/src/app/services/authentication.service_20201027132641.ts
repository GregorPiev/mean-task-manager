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
    this.options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type'
        }
      )
    };
  }

  authenticate(username: string, password: string): Observable<any> {
    let parameters: string = 'username' + '=' + username + '&';
    parameters += 'password' + '=' + Md5.hashStr(password);
    parameters += '&method=authenticate';
    const url = servicePrefix + 'login?' + parameters;
    return this.http.get(url, this.options);
  }
}