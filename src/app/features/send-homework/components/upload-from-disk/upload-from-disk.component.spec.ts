import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFromDiskComponent } from './upload-from-disk.component';

describe('UploadFromDiskComponent', () => {
  let component: UploadFromDiskComponent;
  let fixture: ComponentFixture<UploadFromDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFromDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFromDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
