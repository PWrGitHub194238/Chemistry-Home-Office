import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTablePanelDialogComponent } from './base-table-panel-dialog.component';

describe('BaseTablePanelDialogComponent', () => {
  let component: BaseTablePanelDialogComponent;
  let fixture: ComponentFixture<BaseTablePanelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTablePanelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTablePanelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
