import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) { }

  loadTasksOnStart(): Observable<any> {
    console.log('loadTasksOnStart');
    return this.http.get(`${this.servicePrefix}/tasks/onLoad`)
      .pipe(
        tap(
          data => console.log('Auth data:', data),
          error => console.error('Error: ', error)),
        map(res => res)
      );
  }
  loadTasks(taskFilter: TaskFilterVo): Observable<any> {
    const parameters: string = 'filter' + '=' + HttpUtils.objToJSONString(taskFilter) + '&';
    const url = this.servicePrefix + 'tasks/filteredTasks?' + parameters;
    return this.http.get(url);
  }
}
