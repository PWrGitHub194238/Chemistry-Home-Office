import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDictComponent } from './subject-dict.component';

describe('SubjectDictComponent', () => {
  let component: SubjectDictComponent;
  let fixture: ComponentFixture<SubjectDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
