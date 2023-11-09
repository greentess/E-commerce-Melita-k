import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsOnMainTwoComponent } from './tags-on-main-two.component';

describe('TagsOnMainTwoComponent', () => {
  let component: TagsOnMainTwoComponent;
  let fixture: ComponentFixture<TagsOnMainTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsOnMainTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsOnMainTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
