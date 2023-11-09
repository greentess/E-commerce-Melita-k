import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAviaComponent } from './company-avia.component';

describe('CompanyAviaComponent', () => {
  let component: CompanyAviaComponent;
  let fixture: ComponentFixture<CompanyAviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAviaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
