import { Injectable } from '@angular/core';
import { Employee, LoginInfo } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { URL, METHOD } from '../Constant';
import { map } from 'rxjs/operators';
import { EmployeeModalComponent } from '../system/employee/employee-modal/employee-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeList: Employee[];
  private listUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) { }

  //取得全部employee list
  getEmployeeList() {
    return this.http.get<{ message: string, employeeList: Employee[] }>(URL.IPLocation + URL.EMPLOYEE + METHOD.GET)
    // .pipe(map((res: any) => res.results))
    // .pipe(
    //   map((list: any) => {
    //     return list.map((item: any) => `${item.name.first}`);
    //   })
    // );
    this.listUpdated.next([...this.employeeList])
  }

  //取得特定employee
  getEmployee(employee_id: string) {
    console.log('servie id= ' + employee_id);
    return this.http.get<{ message: string, employeeList: Employee }>(URL.IPLocation + URL.EMPLOYEE + METHOD.GET + '?id=' + employee_id)
  }

  //更新員工資料
  updateEmployee(employee: Employee, callback: (any) => void) {
    console.log(employee);
    if (employee.employee_id) {
      console.log(URL.IPLocation + URL.EMPLOYEE + METHOD.UPDATE)
      this.http.put<{ message: string }>(URL.IPLocation + URL.EMPLOYEE + METHOD.UPDATE, employee)
        .subscribe((data: any) => {
          callback(data)
          console.log(data)
        })
    } else {
      console.log(URL.IPLocation + URL.EMPLOYEE + METHOD.INSERT)
      this.http.post<{ message: string }>(URL.IPLocation + URL.EMPLOYEE + METHOD.INSERT, employee)
        .subscribe((data: any) => {
          callback(data)
          console.log(data)
          alert(data.message)
        })
    }
  }

  //登入
  login(loginInfo:LoginInfo) {
    console.log('run login service');
    console.log(loginInfo)
    console.log(URL.IPLocation + URL.LOGIN + URL.LOGIN)
    this.http.post(URL.IPLocation + URL.LOGIN + URL.LOGIN, loginInfo)
      .subscribe((data: any) => {
        console.log(data)
        alert(data.message)
      })
  }
}
