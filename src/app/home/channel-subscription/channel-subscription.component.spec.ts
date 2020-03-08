import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSubscriptionComponent } from './channel-subscription.component';

describe('ChannelSubscriptionComponent', () => {
  let component: ChannelSubscriptionComponent;
  let fixture: ComponentFixture<ChannelSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
