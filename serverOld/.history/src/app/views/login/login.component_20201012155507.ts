import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/nodejs/authentication.service';
import { UserModel } from './../../model/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  usernameError = '';
  passwordError = '';
  loginErr = '';
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userModel: UserModel
  ) { }

  ngOnInit(): void {
  }

  onReset(): void {
    this.username = '';
    this.password = '';
  }
  onLogin(): void {
    console.log('onLogin')
  }
}
