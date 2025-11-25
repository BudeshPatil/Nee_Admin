import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartypeComponent } from './add-cartype.component';

describe('AddCartypeComponent', () => {
  let component: AddCartypeComponent;
  let fixture: ComponentFixture<AddCartypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCartypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
