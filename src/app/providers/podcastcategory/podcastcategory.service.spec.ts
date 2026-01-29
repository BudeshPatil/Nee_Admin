import { TestBed } from '@angular/core/testing';

import { PodcastcategoryService } from './podcastcategory.service';

describe('PodcastcategoryService', () => {
  let service: PodcastcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcastcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
