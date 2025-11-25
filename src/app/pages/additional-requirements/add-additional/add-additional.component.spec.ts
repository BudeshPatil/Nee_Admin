import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalComponent } from './add-additional.component';

describe('AddAdditionalComponent', () => {
  let component: AddAdditionalComponent;
  let fixture: ComponentFixture<AddAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
