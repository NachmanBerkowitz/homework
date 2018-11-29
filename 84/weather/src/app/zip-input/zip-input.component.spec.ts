import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipInputComponent } from './zip-input.component';

describe('ZipInputComponent', () => {
  let component: ZipInputComponent;
  let fixture: ComponentFixture<ZipInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
