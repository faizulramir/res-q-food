import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostImgPage } from './post-img.page';

describe('PostImgPage', () => {
  let component: PostImgPage;
  let fixture: ComponentFixture<PostImgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostImgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
