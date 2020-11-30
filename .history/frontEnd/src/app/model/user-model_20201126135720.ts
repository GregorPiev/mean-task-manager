import { UserVO } from './../vo/user-vo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserModel {
  user: UserVO;

  validateUser(): boolean {
    console.log('UserModel user:', this.user)
    if (!this.user) {
      return false;
    }
    return true;
  }
}
