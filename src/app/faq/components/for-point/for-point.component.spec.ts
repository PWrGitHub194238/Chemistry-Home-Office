import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForPointComponent } from "./for-point.component";

describe("ForPointComponent", () => {
  let component: ForPointComponent;
  let fixture: ComponentFixture<ForPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForPointComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
