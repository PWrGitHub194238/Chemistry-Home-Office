import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconDictComponent } from "./mat-icon-dict.component";

describe("MatIconDictComponent", () => {
  let component: MatIconDictComponent;
  let fixture: ComponentFixture<MatIconDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatIconDictComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatIconDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
