import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForDescriptionPointComponent } from './for-description-point.component';

describe('ForDescriptionPointComponent', () => {
  let component: ForDescriptionPointComponent;
  let fixture: ComponentFixture<ForDescriptionPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForDescriptionPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForDescriptionPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
