import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowSmallActionButtonComponent } from './row-small-action-button.component';

describe('RowSmallActionButtonComponent', () => {
  let component: RowSmallActionButtonComponent;
  let fixture: ComponentFixture<RowSmallActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowSmallActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowSmallActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
