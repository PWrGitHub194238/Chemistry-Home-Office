import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForSelectComponent } from "./for-select.component";

describe("ForSelectComponent", () => {
  let component: ForSelectComponent;
  let fixture: ComponentFixture<ForSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
