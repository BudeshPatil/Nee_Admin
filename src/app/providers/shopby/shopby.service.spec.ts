import { TestBed } from '@angular/core/testing';

import { ShopbyService } from './shopby.service';

describe('ShopbyService', () => {
  let service: ShopbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
