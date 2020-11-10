import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone','createdOn'];
  dataSource
  constructor(private _employeesService: EmployeesService, private _router: Router) { }

  ngOnInit() {
    this._employeesService.getEmployees().subscribe(
      res=>this.dataSource=res,
      err=>{
        if(err.status===401){
          sessionStorage.clear()
          this._router.navigate(['/'])
        } else
        if(err.status===500){
          sessionStorage.clear()
          this._router.navigate(['/'])
        }
      }
    )
}
}
