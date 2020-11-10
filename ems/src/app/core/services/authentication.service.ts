import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authURL = "http://localhost:3000/users/login";

  constructor(private _http: HttpClient, private _router: Router) { }

  loginUser(user) {
    return this._http.post(this.authURL, user)
  }

  logoutUser(){
    sessionStorage.removeItem('token')
    this._router.navigate(['/'])
  }
  
  loggedIn(){
    return !!sessionStorage.getItem('token')
  }

  getToken(){
    return sessionStorage.getItem('token')
  }

}
