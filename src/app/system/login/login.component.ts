import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginInfo } from 'src/app/model/employee.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  loginInfo: LoginInfo;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.setValidateForm();
  }

  setValidateForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }

  //登入  
  login() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status == 'INVALID') { return; }
    let requireData = this.validateForm.getRawValue();
    console.log(requireData)

    this.loginInfo = {
      employee_email: requireData.email,
      employee_password: requireData.password
    }

    console.log(this.loginInfo)
    this.employeeService.login(this.loginInfo);
  }
}
