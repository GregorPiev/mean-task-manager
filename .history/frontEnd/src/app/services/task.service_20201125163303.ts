import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtils } from './http-utils';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  loadTasksOnStart(): Observable<any> {

    const url = `${this.servicePrefix}/tasks/onLoad`;
    console.log('loadTasksOnStart url:', url);
    return this.http.get(url);

  }
  loadTasks(taskFilter: TaskFilterVo): Observable<any> {
    const parameters: string = 'filter' + '=' + HttpUtils.objToJSONString(taskFilter) + '&';
    const url = this.servicePrefix + 'tasks/filteredTasks?' + parameters;
    return this.http.get(url);
  }
}