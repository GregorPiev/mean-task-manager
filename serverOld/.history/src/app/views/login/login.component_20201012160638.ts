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
    let errorFound: boolean = false;
    this.loginErr = '';
    if (this.username === '') {
      this.usernameError = 'You must enter a Username';
      errorFound = true;
    } else {
      this.usernameError = '';
    }

    if (this.password === '') {
      this.passwordError = 'You must enter a Password';
      errorFound = true;
    } else {
      this.passwordError = '';
    }

    if (errorFound === true) {
      return;
    }
    this.auth.authenticate(this.username, this.password)
      .subscribe(result => {

      },
        error => {

        })
  }
}
