import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizOutModalComponent } from './biz-out-modal.component';

describe('BizOutModalComponent', () => {
  let component: BizOutModalComponent;
  let fixture: ComponentFixture<BizOutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizOutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
