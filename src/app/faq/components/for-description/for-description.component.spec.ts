import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForDescriptionComponent } from './for-description.component';

describe('ForDescriptionComponent', () => {
  let component: ForDescriptionComponent;
  let fixture: ComponentFixture<ForDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
