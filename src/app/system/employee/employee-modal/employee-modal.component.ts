import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  @Input() inputData: any;
  @Input() type: any;

  validateForm: FormGroup;
  employee: any;

  //password
  passwordVisible = false;
  password: string;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, public modal: NzModalRef, ) { }

  ngOnInit(): void {
    if (this.inputData) {
      this.employee = JSON.parse(JSON.stringify(this.inputData));
      console.log(this.employee)
    } else { this.employee = {}; }
    this.setValidateForm();
  }

  //員工清單
  employeeList: Employee[] = [];
  loadMore() {
    this.employeeService.getEmployeeList().subscribe(data => {
      console.log(data.message)
      this.employeeList = data.employeeList
      console.log(this.employeeList)
    });

  }

  //表格
  isCreate: boolean;
  isEdit: boolean;
  private setValidateForm() {
    if (this.type == 'edit') {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }

    if (this.type == 'create') {
      this.isCreate = true;
    } else {
      this.isCreate = false;
    }

    console.log(this.employee)
    this.validateForm = this.formBuilder.group({
      employee_id: this.employee.employee_id,
      employee_name: this.employee.employee_name,
      employee_en: this.employee.employee_en,
      employee_extension: this.employee.employee_extension,
      employee_mobile: this.employee.employee_mobile,
      employee_position: this.employee.employee_position,
      employee_status: this.employee.employee_status,
      employee_email: this.employee.employee_email,
      employee_password: this.employee.employee_password,
      employee_address: this.employee.employee_address,
      employee_onboarddate: [{ value: this.employee.employee_onboarddate, disabled: !this.isCreate }],
      employee_bd: this.employee.employee_bd
    });

    console.log(this.validateForm)
  }

  //修改
  updateEmployeeList() {
    console.log('update start')
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    if (this.validateForm.status == 'INVALID') { return; }

    let requireData = this.validateForm.getRawValue();
    console.log(requireData);

    this.employee = {
      employee_id: requireData.employee_id,
      employee_name: requireData.employee_name,
      employee_en: requireData.employee_en,
      employee_extension: requireData.employee_extension,
      employee_mobile: requireData.employee_mobile,
      employee_position: requireData.employee_position,
      employee_status: requireData.employee_status,
      employee_email: requireData.employee_email,
      employee_password: requireData.employee_password,
      employee_address: requireData.employee_address,
      employee_onboarddate: requireData.employee_onboarddate,
      employee_bd: requireData.employee_bd
    }

    this.employeeService.updateEmployee(this.employee, (data) => {
      this.modal.triggerOk();
    });

    this.modal.close();
  }
}
