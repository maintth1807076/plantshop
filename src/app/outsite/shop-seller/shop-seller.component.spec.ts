import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSellerComponent } from './shop-seller.component';

describe('ShopSellerComponent', () => {
  let component: ShopSellerComponent;
  let fixture: ComponentFixture<ShopSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
