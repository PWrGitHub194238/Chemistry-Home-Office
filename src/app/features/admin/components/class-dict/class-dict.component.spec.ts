import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDictComponent } from './class-dict.component';

describe('ClassDictComponent', () => {
  let component: ClassDictComponent;
  let fixture: ComponentFixture<ClassDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
