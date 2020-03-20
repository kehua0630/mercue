import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';


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
  employeeDetail: EmployeeDetailComponent;

  //password
  passwordVisible = false;
  password: string;

  //必填欄位
  isRequired: boolean;

  constructor(private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public modal: NzModalRef, ) { }

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
      this.employee.employee_status = "1";
      this.employee.employee_onboarddate = new Date();
    } else {
      this.isCreate = false;
    }

    console.log(this.employee)
    this.validateForm = this.formBuilder.group({
      employee_id: this.employee.employee_id,
      employee_name: [this.employee.employee_name, [Validators.required]],
      employee_en: [this.employee.employee_en, [Validators.required]],
      employee_extension: this.employee.employee_extension,
      employee_mobile: this.employee.employee_mobile,
      employee_position: this.employee.employee_position,
      employee_status: [{ value: this.employee.employee_status, disabled: this.isCreate }],
      employee_email: [this.employee.employee_email, [Validators.required]],
      employee_password: [this.employee.employee_password, [Validators.required]],
      employee_address: this.employee.employee_address,
      employee_onboarddate: [{ value: this.employee.employee_onboarddate, disabled: !this.isCreate }, [Validators.required]],
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

    //判斷必填欄位
    if (requireData.employee_name === null ||
      requireData.employee_en === null ||
      requireData.employee_email === null ||
      requireData.employee_password === null ||
      requireData.employee_onboarddate === null) {
      this.isRequired = true;
      console.log(this.isRequired)
    }

    if (this.isRequired) {
      console.log('true')
      alert('Please enter required fields!')
    } else {
      console.log('else')
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
      location.reload();
      this.modal.close();
    }
    // this.employeeService.getEmployee(this.employee.employee_id).subscribe(data => {
    //   console.log(data.message)
    //   this.employee = data.employeeList
    //   console.log(this.employee)
    // });;
    // this.employeeDetail.getEmployee();
  }
}
