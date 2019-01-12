import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerOneComponent } from './inner-one.component';

describe('InnerOneComponent', () => {
  let component: InnerOneComponent;
  let fixture: ComponentFixture<InnerOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
