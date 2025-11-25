import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributesComponent } from './add-attributes.component';

describe('AddAttributesComponent', () => {
  let component: AddAttributesComponent;
  let fixture: ComponentFixture<AddAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
