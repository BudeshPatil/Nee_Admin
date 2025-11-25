import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectioncatComponent } from './add-collectioncat.component';

describe('AddCollectioncatComponent', () => {
  let component: AddCollectioncatComponent;
  let fixture: ComponentFixture<AddCollectioncatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectioncatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollectioncatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
