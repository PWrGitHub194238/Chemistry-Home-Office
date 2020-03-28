import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishUploadBottomSheetComponent } from './finish-upload-bottom-sheet.component';

describe('FinishUploadBottomSheetComponent', () => {
  let component: FinishUploadBottomSheetComponent;
  let fixture: ComponentFixture<FinishUploadBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishUploadBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishUploadBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
