import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BizOutService } from 'src/app/services/biz-out.service';
import { BizOutComponent } from '../biz-out.component';


@Component({
  selector: 'app-biz-out-modal',
  templateUrl: './biz-out-modal.component.html',
  styleUrls: ['./biz-out-modal.component.scss']
})
export class BizOutModalComponent implements OnInit {

  @Input() inputData: any;
  @Input() type: any;

  result: Date[] = [];
  bizoutDetail: any;
  validateForm: FormGroup;
  isCreate: boolean;
  isRead: boolean;
  bizout: any;

  dateRange: Date[] = [];

  constructor(
    private bizoutService: BizOutService,
    public modal: NzModalRef,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.inputData) {
      this.bizoutDetail = JSON.parse(JSON.stringify(this.inputData));
      console.log(this.bizoutDetail)
    } else { this.bizoutDetail = {}; }
    this.setValidateForm();
  }

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

    this.validateForm = this.formBuilder.group({
      id: this.bizoutDetail.id,
      staff_name: [{ value: this.bizoutDetail.staff_name, disabled: !this.isCreate }],
      destination: [{ value: this.bizoutDetail.destination, disabled: this.isRead }],
      dateRange: [{ value: [this.bizoutDetail.startDate, this.bizoutDetail.endDate], disabled: this.isRead }],
      reason: [{ value: this.bizoutDetail.reason, disabled: this.isRead }],
    });

    console.log(this.validateForm)
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    this.result.push(result);
    console.log('onOk', result);
  }


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



}
