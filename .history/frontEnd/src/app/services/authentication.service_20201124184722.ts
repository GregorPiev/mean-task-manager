import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type'
        }
      )
    };
  }

  authenticate(username: string, password: string): Observable<any> {
    // let parameters: string = 'username' + '=' + username + '&';
    // parameters += 'password' + '=' + Md5.hashStr(password);
    // parameters += '&method=authenticate';
    const user = {
      userName: username,
      password: Md5.hashStr(password)
    }
    const url = servicePrefix + 'login';
    return this.http.post(url, user, this.options)
      .pipe(
        map(res => res),
        tap( // Log the result or error
          data => console.log(url, data),
          error => console.error(url, error)
        )
      );;
  }
}
