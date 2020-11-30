import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtils } from './http-utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TaskFilterVo } from './../vo/task-filter-vo';
// tslint:disable-next-line: no-inferrable-types



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  servicePrefix = 'http://localhost:3000';
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


  loadTasks(taskFilter: TaskFilterVo): Observable<any> {
    console.log('Load Tasks:', taskFilter);
    return this.http.post(`${this.servicePrefix}/tasks/filteredTasks`, taskFilter, this.options)
      .pipe(
        tap(
          data => console.log('Auth data:', data),
          error => console.error('Error: ', error)
        ),
        map(res => res),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
