import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard'
import { HelpComponent } from './common/help/help.component';


const routes: Routes = [
  {path:'',redirectTo:"/authenticate",pathMatch:"full"},
  {path:'authenticate',loadChildren: './common/authenticate/authenticate.module#AuthenticateModule'},
  {path:'employees',loadChildren: './employees/employees.module#EmployeesModule',canActivateChild: [AuthenticationGuard]},
  {path:'help',component:HelpComponent},
  {path:'**',redirectTo:"/help",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
