import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollectioncatComponent } from './view-collectioncat.component';

describe('ViewCollectioncatComponent', () => {
  let component: ViewCollectioncatComponent;
  let fixture: ComponentFixture<ViewCollectioncatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCollectioncatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCollectioncatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
