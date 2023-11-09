import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKnivesComponent } from './company-knives.component';

describe('CompanyKnivesComponent', () => {
  let component: CompanyKnivesComponent;
  let fixture: ComponentFixture<CompanyKnivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyKnivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyKnivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
