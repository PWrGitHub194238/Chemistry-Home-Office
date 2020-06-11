import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworksInnerTableDialogComponent } from './sent-homeworks-inner-table-dialog.component';

describe('SentHomeworksInnerTableDialogComponent', () => {
  let component: SentHomeworksInnerTableDialogComponent;
  let fixture: ComponentFixture<SentHomeworksInnerTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworksInnerTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworksInnerTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
