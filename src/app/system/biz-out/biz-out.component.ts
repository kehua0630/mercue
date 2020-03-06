import { Component, OnInit } from '@angular/core';
import { BizOut } from '../../model/bizOut.model';
import { BizOutService } from '../../services/biz-out.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BizOutModalComponent } from './biz-out-modal/biz-out-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-biz-out',
  templateUrl: './biz-out.component.html',
  styleUrls: ['./biz-out.component.scss']
})
export class BizOutComponent implements OnInit {

  constructor(private bizOutService: BizOutService, private modalService: NzModalService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getBizOutData();
  }

  bizout: BizOut;
  bizoutData: BizOut[] = [];
  employee_id: string;


  //新增, 修改, 明細 modal視窗
  showModal(bizout: BizOut | null, type: string) {
    let title: string;
    console.log(bizout)
    console.log(type)

    if (bizout && type == 'read') {
      title = '公出單';
    } else if (bizout && type == 'edit') {
      title = '修改公出單';
    } else {
      title = '公出申請'
    }

    this.modalService.create({
      nzTitle: title,
      nzContent: BizOutModalComponent,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzComponentParams: {
        inputData: bizout,
        type: type,
        // phraseList: this.phraseList,
      },
      nzOnOk: () => {
        if (type != 'read') {
          this.getBizOutData();
          console.log(this.bizout);
        }
      }
    });
  }

  //----------DB function------------------

  getBizOutData() {
    this.bizOutService.getBizOutList().subscribe(
      (data: any) => {
        console.log(data)
        this.bizoutData = data.bizoutList;
        // console.log(data.message)
        console.log(this.bizoutData)
      }
    )
  }

  delete(staff_id: string) {
    console.log(staff_id)
    this.bizOutService.deleteBizOut(staff_id);
    this.getBizOutData();
  }

}
