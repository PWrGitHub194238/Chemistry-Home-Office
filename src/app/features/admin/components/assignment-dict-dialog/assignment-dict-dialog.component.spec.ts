import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDictDialogComponent } from './assignment-dict-dialog.component';

describe('AssignmentDictDialogComponent', () => {
  let component: AssignmentDictDialogComponent;
  let fixture: ComponentFixture<AssignmentDictDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentDictDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentDictDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
