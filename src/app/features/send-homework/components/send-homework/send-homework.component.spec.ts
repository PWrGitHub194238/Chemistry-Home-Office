import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHomeworkComponent } from './send-homework.component';

describe('SendHomeworkComponent', () => {
  let component: SendHomeworkComponent;
  let fixture: ComponentFixture<SendHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
