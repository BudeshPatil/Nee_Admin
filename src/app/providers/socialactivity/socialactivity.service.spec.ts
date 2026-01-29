import { TestBed } from '@angular/core/testing';

import { SocialactivityService } from './socialactivity.service';

describe('SocialactivityService', () => {
  let service: SocialactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialactivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
