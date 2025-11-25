import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoudytypeComponent } from './add-boudytype.component';

describe('AddBoudytypeComponent', () => {
  let component: AddBoudytypeComponent;
  let fixture: ComponentFixture<AddBoudytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoudytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoudytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
