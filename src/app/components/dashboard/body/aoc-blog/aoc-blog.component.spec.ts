import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AocBlogComponent } from './aoc-blog.component';

describe('AocBlogComponent', () => {
  let component: AocBlogComponent;
  let fixture: ComponentFixture<AocBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AocBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AocBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
