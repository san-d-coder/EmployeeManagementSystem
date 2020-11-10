import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm;
  createSuccess = false;
  craeteFailure = false;
  errorMessage;
  employeeFound = true;
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeesService,
    private snackBar: MatSnackBar,
  ) {
    this.createForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(employeeData) {

    this.createForm.reset();

    this.employeeService.createEmployee(employeeData).subscribe(
      res => {
        this.snackBar.open('Record added', 'Dismiss', {
          duration: 3000
        });
        this.createForm.reset();
      },

      err => {
        if (err.status === 401) {
          this.createSuccess = false;
          this.craeteFailure = true;
          this.errorMessage = err.message;
          console.log(err)
        } else
          if (err.status === 500) {
            this.createSuccess = false;
            this.craeteFailure = true;
            this.errorMessage = err.message;
            console.log(err)
          }
      }
    );
  }
}
