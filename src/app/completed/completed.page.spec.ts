import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompletedPage } from './completed.page';

describe('CompletedPage', () => {
  let component: CompletedPage;
  let fixture: ComponentFixture<CompletedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
