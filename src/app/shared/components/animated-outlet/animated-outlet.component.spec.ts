import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedOutletComponent } from './animated-outlet.component';

describe('AnimatedOutletComponent', () => {
  let component: AnimatedOutletComponent;
  let fixture: ComponentFixture<AnimatedOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
