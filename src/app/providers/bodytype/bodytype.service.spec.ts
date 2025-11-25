import { TestBed } from '@angular/core/testing';

import { BodytypeService } from './bodytype.service';

describe('BodytypeService', () => {
  let service: BodytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
