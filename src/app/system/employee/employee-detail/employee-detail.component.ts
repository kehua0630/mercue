import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  employee: Employee;
  employee_name: string;
  employee_en: string;
  employee_extension: string;
  employee_mobile: string;
  employee_position: string;
  employee_status: string;
  employee_email: string;
  employee_password: string;
  employee_address: string;
  employee_onboarddate: Date;
  employee_bd: Date;


  //回上一頁
  goBack(): void {
    this.location.back();
  }


  //取得員工資料
  getEmployee(): void {
    console.log('get employee detail')
    const id = +this.route.snapshot.paramMap.get('id');//用route.snapshot.paramMap.get取得Routing時傳入的變數
    console.log(id)
    this.employeeService.getEmployee(id.toString())
      .subscribe((data) => {
        console.log(data);
        this.employee = data.employeeList[0];
        switch (data.employeeList[0].employee_status) {
          case '1': this.employee_status = '在職'
            break;
          case '2': this.employee_status = '離職';
            break;
          case '3': this.employee_status = '留職停薪';
            break;
        }
        this.employee_name = this.employee.employee_name;
        this.employee_en = this.employee.employee_en;
        this.employee_mobile = this.employee.employee_mobile;
        this.employee_position = this.employee.employee_position;
        this.employee_email = this.employee.employee_email;
        this.employee_password = this.employee.employee_password
        this.employee_address = this.employee.employee_address;
        this.employee_onboarddate = this.employee.employee_onboarddate;
        this.employee_bd = this.employee.employee_bd;

      })
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
