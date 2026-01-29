import { TestBed } from '@angular/core/testing';

import { HomegalleryService } from './homegallery.service';

describe('GalleryService', () => {
  let service: HomegalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomegalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
