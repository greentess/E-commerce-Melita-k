import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFooterComponent } from './start-footer.component';

describe('StartFooterComponent', () => {
  let component: StartFooterComponent;
  let fixture: ComponentFixture<StartFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
