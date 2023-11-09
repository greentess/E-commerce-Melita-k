import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredCatalogComponent } from './pred-catalog.component';

describe('PredCatalogComponent', () => {
  let component: PredCatalogComponent;
  let fixture: ComponentFixture<PredCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
