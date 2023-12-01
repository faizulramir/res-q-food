import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PostPage } from './post.page';

describe('PostPage', () => {
  let component: PostPage;
  let fixture: ComponentFixture<PostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
