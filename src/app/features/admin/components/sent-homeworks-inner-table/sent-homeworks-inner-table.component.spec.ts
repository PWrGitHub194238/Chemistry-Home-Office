import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworksInnerTableComponent } from './sent-homeworks-inner-table.component';

describe('SentHomeworksInnerTableComponent', () => {
  let component: SentHomeworksInnerTableComponent;
  let fixture: ComponentFixture<SentHomeworksInnerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworksInnerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworksInnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
