import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common/material/material.module';
import { SidenavModule } from './common/sidenav/sidenav.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthenticateModule } from './common/authenticate/authenticate.module';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { HelpComponent } from './common/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticateModule,
    MaterialModule,
    SidenavModule,
    EmployeesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
