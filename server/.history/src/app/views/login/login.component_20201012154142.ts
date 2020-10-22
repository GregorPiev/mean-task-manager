import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/nodejs/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private auth: AuthenticationService) { }

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
