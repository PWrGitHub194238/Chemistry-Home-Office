import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkPathsComponent } from './homework-paths.component';

describe('HomeworkPathsComponent', () => {
  let component: HomeworkPathsComponent;
  let fixture: ComponentFixture<HomeworkPathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkPathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
