import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaFileIconComponent } from './fa-file-icon.component';

describe('FaFileIconComponent', () => {
  let component: FaFileIconComponent;
  let fixture: ComponentFixture<FaFileIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaFileIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaFileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
