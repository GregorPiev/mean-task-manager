import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultObjectVo } from '../../vo/result-object-vo';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  const servicePrefix: string = '/nodejs/';
  constructor() {

  }
}
