import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackComponent } from './subscription-pack.component';

describe('SubscriptionPackComponent', () => {
  let component: SubscriptionPackComponent;
  let fixture: ComponentFixture<SubscriptionPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
