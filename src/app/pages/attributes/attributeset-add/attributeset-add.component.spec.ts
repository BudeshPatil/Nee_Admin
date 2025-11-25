import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesetAddComponent } from './attributeset-add.component';

describe('AttributesetAddComponent', () => {
  let component: AttributesetAddComponent;
  let fixture: ComponentFixture<AttributesetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesetAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
