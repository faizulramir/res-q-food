import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RoomTalkPage } from './room-talk.page';

describe('RoomTalkPage', () => {
  let component: RoomTalkPage;
  let fixture: ComponentFixture<RoomTalkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomTalkPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomTalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
