import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForTeacherComponent } from "./for-teacher.component";

describe("ForTeacherComponent", () => {
  let component: ForTeacherComponent;
  let fixture: ComponentFixture<ForTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForTeacherComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
