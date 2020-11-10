import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RemoveComponent } from './remove/remove.component';
import { ShowComponent } from './show/show.component';



const routes: Routes = [
  {path:'', component: ShowComponent},
  {path:'new', component: CreateComponent},
  {path:'edit',component:EditComponent},
  {path:'remove',component:RemoveComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
