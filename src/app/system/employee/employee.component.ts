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

  //----------DB function------------------
  employeeData: Employee[];
  getEmployeeData() {
    this.employeeService.getEmployeeList().subscribe(
      (data: any) => {
        console.log(data);
        /** sort data **/
        if (this.sortName && this.sortValue) {
          this.employeeData = data.employeeList.sort((a, b) =>
            this.sortValue === 'ascend'
              ? a[this.sortName!] > b[this.sortName!]
                ? 1
                : -1
              : b[this.sortName!] > a[this.sortName!]
                ? 1
                : -1
          );
          console.log(this.employeeData)
        } else {
          this.employeeData = data.employeeList;
        }
        // this.employeeData = data.employeeList;
        console.log(this.employeeData)
      })

  }


  //  sort
  sortName: string | null = null;
  sortValue: string | null = null;
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.getEmployeeData();
  }

  //新增, 修改, 明細 modal視窗
  showModal(employee: Employee | null, type: string) {
    let title: string;
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


}
