import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { URL, METHOD } from '../Constant';
import { map } from 'rxjs/operators';

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

  deleteEmployee(employee_id: string) {
    console.log(employee_id)
    this.http.get<{ message: string, employeeList: Employee[] }>(URL.IPLocation + URL.BIZOUT + METHOD.DELETE + '?id=' + employee_id).subscribe(
      (data: any) => {
        console.log(data.message)
      })
  }
}
