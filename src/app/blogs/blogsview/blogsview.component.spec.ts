import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsviewComponent } from './blogsview.component';

describe('BlogsviewComponent', () => {
  let component: BlogsviewComponent;
  let fixture: ComponentFixture<BlogsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
