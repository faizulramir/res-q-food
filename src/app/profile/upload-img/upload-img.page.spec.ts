import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadImgPage } from './upload-img.page';

describe('UploadImgPage', () => {
  let component: UploadImgPage;
  let fixture: ComponentFixture<UploadImgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadImgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
