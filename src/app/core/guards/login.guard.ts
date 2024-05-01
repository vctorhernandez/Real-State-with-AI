import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    if (this._userService.isLogged()) {
      console.log("Login guard is ok!")
      return true;
    }
    else {
      console.log("Blocked by login guard.")
      this._router.navigate(['/login']);
      return false;
    }
  }
}