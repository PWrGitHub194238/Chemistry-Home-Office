import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFromCameraComponent } from './upload-from-camera.component';

describe('UploadFromCameraComponent', () => {
  let component: UploadFromCameraComponent;
  let fixture: ComponentFixture<UploadFromCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFromCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFromCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
