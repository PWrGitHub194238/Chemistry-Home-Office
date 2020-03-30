import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UpdateUserDetailsBottomSheetComponent } from "./update-user-details-bottom-sheet.component";

describe("UpdateUserDetailsBottomSheetComponent", () => {
  let component: UpdateUserDetailsBottomSheetComponent;
  let fixture: ComponentFixture<UpdateUserDetailsBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserDetailsBottomSheetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserDetailsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
