import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentHomeworkFilesGalleryComponent } from './sent-homework-files-gallery.component';

describe('SentHomeworkFilesGalleryComponent', () => {
  let component: SentHomeworkFilesGalleryComponent;
  let fixture: ComponentFixture<SentHomeworkFilesGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentHomeworkFilesGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentHomeworkFilesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
