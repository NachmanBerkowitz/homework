import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggersSidebarComponent } from './bloggers-sidebar.component';

describe('BloggersSidebarComponent', () => {
  let component: BloggersSidebarComponent;
  let fixture: ComponentFixture<BloggersSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloggersSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggersSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
