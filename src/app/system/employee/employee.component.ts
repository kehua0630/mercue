import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

   //新增, 修改, 明細 modal視窗
  //  showModal(bizout: BizOut | null, type: string) {
  //   let title:string;
  //   console.log(bizout)
  //   console.log(type)

  //   if (bizout && type == 'read') {
  //     title = '公出單';
  //   } else if (bizout && type == 'edit') {
  //     title = '修改公出單';
  //   } else { 
  //     title = '公出申請'
  //   }

  //   this.modalService.create({
  //     nzTitle: title,
  //     nzContent: BizOutModalComponent,
  //     nzWidth: '50%',
  //     nzMaskClosable: false,
  //     nzComponentParams: {
  //       inputData: bizout,
  //       type: type,
  //       // phraseList: this.phraseList,
  //     },
  //     nzOnOk: () => {
  //       if (type != 'read') {
  //         this.getBizOutData();
  //         console.log(this.bizout);
  //       }
  //     }
  //   });
  // }

  //----------DB function------------------
  employeeData: Employee[];
  getEmployeeData() {
    this.employeeService.getEmployeeList().subscribe(
      (data: any) => {
        console.log(data)
        this.employeeData = data.employeeList;
        console.log(this.employeeData)
      }
    )
  }

  delete(employee_id: string) {
    console.log(employee_id)
    this.employeeService.deleteEmployee(employee_id);
    this.getEmployeeData();
  }
}
