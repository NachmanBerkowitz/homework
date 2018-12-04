import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggersComponent } from './bloggers.component';

describe('BloggersComponent', () => {
  let component: BloggersComponent;
  let fixture: ComponentFixture<BloggersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloggersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
