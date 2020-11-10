import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employeeURL = "http://localhost:3000/employees"
  constructor(private _http: HttpClient) { }

  getEmployees(){
    return this._http.get(this.employeeURL)
  }

  getEmployee(email){
    return this._http.get(this.employeeURL+'/'+email)
  }

  editEmployee(email,body){
    return this._http.patch(this.employeeURL+'/'+email,body)
  }

  removeEmployee(email){
    return this._http.delete(this.employeeURL+'/'+email)
  }

  createEmployee(employeeData){
    return this._http.post(this.employeeURL,employeeData)
  }

}
