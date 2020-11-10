import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(private _authentication: AuthenticationService, private _router: Router) { }

  canActivate() {
    if (this._authentication.loggedIn()) { return true }
    else {
      this._router.navigate(['/'])
      return false
    }
  }

  canActivateChild() {
    if (this._authentication.loggedIn()) { return true }
    else {
      this._router.navigate(['/'])
      return false
    }
  }
}
