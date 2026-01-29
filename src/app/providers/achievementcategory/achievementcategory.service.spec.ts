import { TestBed } from '@angular/core/testing';

import { AchievementcategoryService } from './achievementcategory.service';

describe('AchievementcategoryService', () => {
  let service: AchievementcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
