import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilersComponent } from './dilers.component';

describe('DilersComponent', () => {
  let component: DilersComponent;
  let fixture: ComponentFixture<DilersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
