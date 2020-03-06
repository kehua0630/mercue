import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getEmloyee();
  }

  employee: any;
  status: string = '';

  //回上一頁
  goBack(): void {
    this.location.back();
  }


  //取得員工資料
  getEmloyee(): void {
    console.log('get employee detail')
    const id = +this.route.snapshot.paramMap.get('id');//用route.snapshot.paramMap.get取得Routing時傳入的變數
    console.log(id)
    this.employeeService.getEmployee(id.toString())
      .subscribe((data) => {
        console.log(data);
        this.employee = data.employeeList[0];
        // this.status = data.employeeList[0].employee_status
        console.log(data.employeeList[0].employee_status)
        switch (data.employeeList[0].employee_status) {
          case '1': this.status = '在職';
            console.log('case 1:' + this.status)
            break;
          case '2': this.status = '離職';
            break;
          case '3': this.status = '留職停薪';
            break;
        }
    
      })

    
  }

}
