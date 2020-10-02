import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreeComponent } from './edit-tree.component';

describe('EditTreeComponent', () => {
  let component: EditTreeComponent;
  let fixture: ComponentFixture<EditTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
