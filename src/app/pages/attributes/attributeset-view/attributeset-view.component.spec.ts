import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesetViewComponent } from './attributeset-view.component';

describe('AttributesetViewComponent', () => {
  let component: AttributesetViewComponent;
  let fixture: ComponentFixture<AttributesetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesetViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
