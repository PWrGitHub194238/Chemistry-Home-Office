import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForStudentComponent } from "./for-student.component";

describe("ForStudentComponent", () => {
  let component: ForStudentComponent;
  let fixture: ComponentFixture<ForStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForStudentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
