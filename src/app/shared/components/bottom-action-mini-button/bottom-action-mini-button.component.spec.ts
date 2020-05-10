import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomActionMiniButtonComponent } from './bottom-action-mini-button.component';

describe('BottomActionMiniButtonComponent', () => {
  let component: BottomActionMiniButtonComponent;
  let fixture: ComponentFixture<BottomActionMiniButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomActionMiniButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomActionMiniButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
