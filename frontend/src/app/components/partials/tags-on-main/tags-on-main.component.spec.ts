import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsOnMainComponent } from './tags-on-main.component';

describe('TagsOnMainComponent', () => {
  let component: TagsOnMainComponent;
  let fixture: ComponentFixture<TagsOnMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsOnMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsOnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
