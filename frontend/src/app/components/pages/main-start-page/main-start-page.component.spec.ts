import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStartPageComponent } from './main-start-page.component';

describe('MainStartPageComponent', () => {
  let component: MainStartPageComponent;
  let fixture: ComponentFixture<MainStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainStartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
