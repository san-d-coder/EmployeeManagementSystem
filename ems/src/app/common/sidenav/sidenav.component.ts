import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLoggedIn: Boolean
  constructor(private _authService: AuthenticationService) { }

  
  
  ngOnInit() {}
  
  toggleSideNav(snav){
    snav.toggle();
  }

  
  
}
