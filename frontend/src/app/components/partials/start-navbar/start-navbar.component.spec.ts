import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNavbarComponent } from './start-navbar.component';

describe('StartNavbarComponent', () => {
  let component: StartNavbarComponent;
  let fixture: ComponentFixture<StartNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
