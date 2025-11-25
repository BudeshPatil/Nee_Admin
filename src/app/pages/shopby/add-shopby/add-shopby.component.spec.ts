import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopbyComponent } from './add-shopby.component';

describe('AddShopbyComponent', () => {
  let component: AddShopbyComponent;
  let fixture: ComponentFixture<AddShopbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShopbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
