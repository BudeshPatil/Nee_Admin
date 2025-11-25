import { TestBed } from '@angular/core/testing';

import { CollectioncategoryService } from './collectioncategory.service';

describe('CollectioncategoryService', () => {
  let service: CollectioncategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectioncategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
