import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworksComponent } from './sent-homeworks.component';

describe('SentHomeworksComponent', () => {
  let component: SentHomeworksComponent;
  let fixture: ComponentFixture<SentHomeworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
