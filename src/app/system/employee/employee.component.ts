import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employee } from '../../model/employee.model';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';

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
   showModal(employee:Employee | null, type: string) {
    let title:string;
    console.log(employee)
    console.log(type)

    if (employee && type == 'edit') {
      title = '修改員工資料';
    } else { 
      title = '新增員工'
    }

    this.modalService.create({
      nzTitle: title,
      nzContent: EmployeeModalComponent,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzComponentParams: {
        inputData: employee,
        type: type,
        // phraseList: this.phraseList,
      },
      // nzOnOk: () => {
      //   if (type != 'read') {
      //     this.getBizOutData();
      //     console.log(this.bizout);
      //   }
      // }
    });
  }

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
}
