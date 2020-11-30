import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtils } from './http-utils';
import { Observable } from 'rxjs';
import { TaskFilterVo } from './../vo/task-filter-vo';
// tslint:disable-next-line: no-inferrable-types
const servicePrefix: string = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  loadTasks(taskFilter: TaskFilterVo): Observable<any> {
    const parameters: string = 'filter' + '=' + HttpUtils.objToJSONString(taskFilter) + '&';
    const url = servicePrefix + 'tasks/filteredTasks?' + parameters;
    return this.http.get(url);
  }
}
