import { TestBed } from '@angular/core/testing';

import { CartypeService } from './cartype.service';

describe('CartypeService', () => {
  let service: CartypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
