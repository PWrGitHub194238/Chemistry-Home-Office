import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSendTypeBottomSheetComponent } from './select-send-type-bottom-sheet.component';

describe('SelectSendTypeBottomSheetComponent', () => {
  let component: SelectSendTypeBottomSheetComponent;
  let fixture: ComponentFixture<SelectSendTypeBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSendTypeBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSendTypeBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
