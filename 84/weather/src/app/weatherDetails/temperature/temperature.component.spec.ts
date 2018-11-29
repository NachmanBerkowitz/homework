import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { temperatureComponent } from './temperature.component';

describe('temperatureComponent', () => {
  let component: temperatureComponent;
  let fixture: ComponentFixture<temperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ temperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(temperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
