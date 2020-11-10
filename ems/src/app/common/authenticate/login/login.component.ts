import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

  }


  onLogIn(loginData) {

    this.loginForm.reset();

    this.authentication.loginUser(loginData).subscribe(

      res =>
      {
        sessionStorage.setItem('token', res['token'])
        this.router.navigate(['/employees'])
      },
      err=>console.log(err)
      
    );
  }

  ngOnInit() {
  }

}
