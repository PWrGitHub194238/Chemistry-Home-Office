import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworksDialogComponent } from './sent-homeworks-dialog.component';

describe('SentHomeworksDialogComponent', () => {
  let component: SentHomeworksDialogComponent;
  let fixture: ComponentFixture<SentHomeworksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
