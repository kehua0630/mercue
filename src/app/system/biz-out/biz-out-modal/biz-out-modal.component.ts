import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BizOutService } from 'src/app/services/biz-out.service';
import { BizOutComponent } from '../biz-out.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-biz-out-modal',
  templateUrl: './biz-out-modal.component.html',
  styleUrls: ['./biz-out-modal.component.scss']
})
export class BizOutModalComponent implements OnInit {

  @Input() inputData: any;
  @Input() type: any;


  bizoutDetail: any;
  validateForm: FormGroup;
  bizout: any;

  constructor(
    private bizoutService: BizOutService,
    private employeeService: EmployeeService,
    public modal: NzModalRef,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.inputData) {
      this.bizoutDetail = JSON.parse(JSON.stringify(this.inputData));
      console.log(this.bizoutDetail)
    } else { this.bizoutDetail = {}; }
    this.setValidateForm();
    this.loadMore();
  }

  //表格
  isCreate: boolean;
  isRead: boolean;
  private setValidateForm() {
    if (this.type == 'read') {
      this.isRead = true;
    } else {
      this.isRead = false;
    }

    if (this.type == 'create') {
      this.isCreate = true;
    } else {
      this.isCreate = false;
    }

    console.log(this.bizoutDetail.staff_name)
    this.validateForm = this.formBuilder.group({
      id: this.bizoutDetail.id,
      staff_name: [{ value: this.bizoutDetail.staff_name, disabled: !this.isCreate }],
      destination: [{ value: this.bizoutDetail.destination, disabled: this.isRead }],
      dateRange: [{ value: [this.bizoutDetail.startDate, this.bizoutDetail.endDate], disabled: this.isRead }],
      reason: [{ value: this.bizoutDetail.reason, disabled: this.isRead }],
    });

    console.log(this.validateForm)
  }

  //日期
  result: Date[] = [];
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    this.result.push(result);
    console.log('onOk', result);
  }

  //修改
  updateBizOutList() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    if (this.validateForm.status == 'INVALID') { return; }

    let requireData = this.validateForm.getRawValue();
    console.log(requireData);

    this.bizout = {
      id: requireData.id,
      staff_name: requireData.staff_name,
      destination: requireData.destination,
      reason: requireData.reason,
      startDate: requireData.dateRange[0],
      endDate: requireData.dateRange[1],
      status: 1
    }

    this.bizoutService.updateBizOut(this.bizout, (data) => {
      this.modal.triggerOk();
    });
    this.modal.close();
  }

  //姓名
  employeeList: Employee[] = [];
  loadMore(){
    this.employeeService.getEmployeeList().subscribe(data => {
      console.log(data.message)
      this.employeeList = data.employeeList
      console.log(this.employeeList)
    });

  }

}
