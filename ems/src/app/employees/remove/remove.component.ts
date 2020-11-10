import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  deleteForm;
  errorMessage;
  errorOccurred = false;
  employeeFound = false;
  deleteSuccessful = false;
  emailId;
  nameId;
  phoneId;
  
  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeesService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.deleteForm = this.formBuilder.group({
      email: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(employeeData){
      this.employeeService.removeEmployee(this.emailId).subscribe(
      res=>{
        this.snackBar.open('Record deleted', 'Dismiss',{
          duration: 3000
        });
        this.router.navigate(['/employees']);
      },
      err=>{
        if(err.status===404){
          this.employeeFound = false;
          this.errorOccurred = true;
          this.errorMessage = err.message;
          console.log(err)
        } else
        if(err.status===500){
          this.employeeFound = true;
          this.errorOccurred = true;
          this.errorMessage = err.message;
          console.log(err)
      }
      }    
    );
    }

  onReset(){
    this.employeeFound = false;
    this.deleteForm.reset();
  }  

  searchEmployee(email){
    if(email!==''){
      if(email==='.'||email==='#'){
        console.log(email);
        this.deleteForm.reset();
        this.errorOccurred = true;
        this.errorMessage = "Enter a valid email";
      }
    else{
    this.employeeService.getEmployee(email).subscribe(
      res=>{
        this.emailId = res['email'];
        this.employeeFound = true;
        this.errorMessage = false;
        this.emailId = res['email'];
        this.nameId  = res['name'];
        this.phoneId = res['phone'];
      },
      err=>{
        if(err.status===404){
          this.employeeFound = false;
          this.errorOccurred = true;
          this.errorMessage = err.message;
          console.log(err)
        } else
        if(err.status===500){
          this.employeeFound = false;
          this.errorOccurred = true;
          this.errorMessage = err.message;
          console.log(err)

      }
    }
    )
  }
}
  }

}
