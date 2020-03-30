import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeworkPathDialogComponent } from "./homework-path-dialog.component";

describe("HomeworkPathDialogComponent", () => {
  let component: HomeworkPathDialogComponent;
  let fixture: ComponentFixture<HomeworkPathDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeworkPathDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkPathDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
