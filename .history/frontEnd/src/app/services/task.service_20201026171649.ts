import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line: no-inferrable-types
const servicePrefix: string = '/server/';
export class TaskService {

  constructor(private http: HttpClient) { }
}
