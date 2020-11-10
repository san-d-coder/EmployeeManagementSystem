import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm;
  errorMessage;
  errorOccurred = false;
  employeeFound = false;
  emailId;
  
  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeesService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.editForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(employeeData){
      this.employeeService.editEmployee(this.emailId,employeeData).subscribe(
      res=>{
        this.snackBar.open('Changes saved', 'Dismiss',{
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

  searchEmployee(email){
    if(email!==''){
      if(email==='.'||email==='#'){
        console.log(email);
        this.editForm.reset();
        this.errorOccurred = true;
        this.errorMessage = "Enter a valid email";
      }
    else{
    this.employeeService.getEmployee(email).subscribe(
      res=>{
        this.emailId = res['email'];
        this.employeeFound = true;
        this.errorOccurred = false;
        this.editForm.controls['name'].setValue(res['name']);
        this.editForm.controls['email'].setValue(res['email']);
        this.editForm.controls['phone'].setValue(res['phone']);
      },
      err=>{
        if(err.status===404){
          this.employeeFound = false;
          this.errorOccurred = true;
          this.errorMessage = "Employee not found";
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
