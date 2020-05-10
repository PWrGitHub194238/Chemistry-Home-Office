import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDictDialogComponent } from './class-dict-dialog.component';

describe('ClassDictDialogComponent', () => {
  let component: ClassDictDialogComponent;
  let fixture: ComponentFixture<ClassDictDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDictDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDictDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
