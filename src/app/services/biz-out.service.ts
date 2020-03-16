import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BizOut } from '../model/bizOut.model';
import { URL, METHOD } from '../Constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BizOutService {

  private bizOutList:BizOut[];
  private listUpdated = new Subject<BizOut[]>();

  constructor(private http: HttpClient) { }

  getBizOutList() {
    return this.http.get<{ message: string, bizOutList: BizOut[] }>(URL.IPLocation + URL.BIZOUT + METHOD.GET)
    this.listUpdated.next([...this.bizOutList])
  }

  deleteBizOut(staff_id: string) {
    console.log(staff_id)
    this.http.get<{ message: string, bizOutList: BizOut[] }>(URL.IPLocation + URL.BIZOUT + METHOD.DELETE + '?id=' + staff_id).subscribe(
      (data: any) => {
        console.log(data.message)
      })
  }


  updateBizOut(bizOut: BizOut, callback: (any) => void) {
    console.log(bizOut)
    if (bizOut.id) {
      this.http.post<{ message: string }>(URL.IPLocation + URL.BIZOUT + METHOD.UPDATE, bizOut)
      .subscribe((data: any) => { callback(data) })
    } else {
      console.log(URL.IPLocation + URL.BIZOUT + METHOD.INSERT)
      this.http.post<{ message: string }>(URL.IPLocation + URL.BIZOUT + METHOD.INSERT, bizOut)
      .subscribe((data: any) => { callback(data) })
    }

  }

}
