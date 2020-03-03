import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizOutComponent } from './biz-out.component';

describe('BizOutComponent', () => {
  let component: BizOutComponent;
  let fixture: ComponentFixture<BizOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
