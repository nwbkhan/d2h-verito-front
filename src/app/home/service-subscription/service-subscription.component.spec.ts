import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSubscriptionComponent } from './service-subscription.component';

describe('ServiceSubscriptionComponent', () => {
  let component: ServiceSubscriptionComponent;
  let fixture: ComponentFixture<ServiceSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
