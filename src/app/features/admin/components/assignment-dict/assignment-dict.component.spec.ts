import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDictComponent } from './assignment-dict.component';

describe('AssignmentDictComponent', () => {
  let component: AssignmentDictComponent;
  let fixture: ComponentFixture<AssignmentDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentDictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
