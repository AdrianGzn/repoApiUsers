import { TestBed } from '@angular/core/testing';

import { CurrencysService } from './currencys.service';

describe('CurrencysService', () => {
  let service: CurrencysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
