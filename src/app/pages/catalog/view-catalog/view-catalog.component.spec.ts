import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatalogComponent } from './view-catalog.component';

describe('ViewCatalogComponent', () => {
  let component: ViewCatalogComponent;
  let fixture: ComponentFixture<ViewCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
