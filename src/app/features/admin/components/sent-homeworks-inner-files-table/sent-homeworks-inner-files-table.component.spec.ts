import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworksInnerFilesTableComponent } from './sent-homeworks-inner-files-table.component';

describe('SentHomeworksInnerFilesTableComponent', () => {
  let component: SentHomeworksInnerFilesTableComponent;
  let fixture: ComponentFixture<SentHomeworksInnerFilesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworksInnerFilesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworksInnerFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
