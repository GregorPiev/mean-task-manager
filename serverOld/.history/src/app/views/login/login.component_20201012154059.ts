import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor() { }

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
