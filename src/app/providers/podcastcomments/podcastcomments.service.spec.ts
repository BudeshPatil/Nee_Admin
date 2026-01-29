import { TestBed } from '@angular/core/testing';

import { PodcastcommentsService } from './podcastcomments.service';

describe('PodcastcommentsService', () => {
  let service: PodcastcommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcastcommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
