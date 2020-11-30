import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ResultObjectVo } from '../vo/result-object-vo';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  options: object;
  servicePrefix = 'http://localhost:3000';

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
    console.log('Server=>Authenticate');
    const user = {
      userName: username,
      password: Md5.hashStr(password)
    };

    return this.http.post(`${this.servicePrefix}/account/login`, user, this.options)
      .pipe(
        tap( // Log the result or error
          data => console.log('Auth data:', data),
          error => console.error('Error: ', error)
        ),
        map(res => res)
      );
  }
}
