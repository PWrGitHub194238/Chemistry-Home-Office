import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomActionButtonComponent } from './bottom-action-button.component';

describe('BottomActionButtonComponent', () => {
  let component: BottomActionButtonComponent;
  let fixture: ComponentFixture<BottomActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
