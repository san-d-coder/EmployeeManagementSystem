import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private _authentication: AuthenticationService) { }
  intercept(req, next){
    
    let authorizationHeaderValue = 'Bearer '
    authorizationHeaderValue += this._authentication.getToken()

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: authorizationHeaderValue
      }
    })
    return next.handle(tokenizedRequest)
  }
}
