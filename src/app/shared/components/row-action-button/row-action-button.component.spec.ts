import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowActionButtonComponent } from './row-action-button.component';

describe('RowActionButtonComponent', () => {
  let component: RowActionButtonComponent;
  let fixture: ComponentFixture<RowActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
