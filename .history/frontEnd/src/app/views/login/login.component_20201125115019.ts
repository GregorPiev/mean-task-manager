import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserModel } from './../../model/user-model';
import { UserVO } from './../../vo/user-vo';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private userModel: UserModel,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onReset(): void {
    this.username = '';
    this.password = '';
  }
  onLogin(): void {
    console.log('onLogin');
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
        if (result.error) {
          this.loginErr = 'We could not log you in';
          return;
        }
        this.userModel.user = result.resultObject as UserVO;
        this.flashMessagesService.show('Login is done by success', { cssClass: 'alert-success', timeout: 3000 });
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 3100);
      },
        error => {
          this.flashMessagesService.show('There was an authentication service error', { cssClass: 'alert-danger', timeout: 3000 })
          // this.loginErr = 'There was an authentication service error';
        });
  }
}
