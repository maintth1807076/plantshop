import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsiteComponent } from './outsite.component';

describe('OutsiteComponent', () => {
  let component: OutsiteComponent;
  let fixture: ComponentFixture<OutsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
