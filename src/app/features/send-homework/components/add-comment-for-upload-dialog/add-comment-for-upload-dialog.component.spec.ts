import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentForUploadDialogComponent } from './add-comment-for-upload-dialog.component';

describe('AddCommentForUploadDialogComponent', () => {
  let component: AddCommentForUploadDialogComponent;
  let fixture: ComponentFixture<AddCommentForUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommentForUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentForUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
