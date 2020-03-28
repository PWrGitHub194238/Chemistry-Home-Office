import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonNotFoundComponent } from './lesson-not-found.component';

describe('LessonNotFoundComponent', () => {
  let component: LessonNotFoundComponent;
  let fixture: ComponentFixture<LessonNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
