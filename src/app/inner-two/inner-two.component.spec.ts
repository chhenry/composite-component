import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTwoComponent } from './inner-two.component';

describe('InnerTwoComponent', () => {
  let component: InnerTwoComponent;
  let fixture: ComponentFixture<InnerTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
