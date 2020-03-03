import { TestBed } from '@angular/core/testing';

import { BizOutService } from './biz-out.service';

describe('BizOutService', () => {
  let service: BizOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
