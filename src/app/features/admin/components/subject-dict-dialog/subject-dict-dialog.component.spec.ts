import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDictDialogComponent } from './subject-dict-dialog.component';

describe('SubjectDictDialogComponent', () => {
  let component: SubjectDictDialogComponent;
  let fixture: ComponentFixture<SubjectDictDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDictDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDictDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
