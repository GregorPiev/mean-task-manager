import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from './../model/user-model';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userModel: UserModel
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Guard:', this.userModel.validateUser());
    if (this.userModel.validateUser()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
