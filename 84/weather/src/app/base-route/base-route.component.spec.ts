import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRouteComponent } from './base-route.component';

describe('BaseRouteComponent', () => {
  let component: BaseRouteComponent;
  let fixture: ComponentFixture<BaseRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
