import { TestBed } from '@angular/core/testing';

import { RegisterloginService } from './registerlogin.service';

describe('RegisterloginService', () => {
  let service: RegisterloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
