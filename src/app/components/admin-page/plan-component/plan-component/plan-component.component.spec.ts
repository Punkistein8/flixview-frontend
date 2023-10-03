import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponentComponent } from './plan-component.component';

describe('PlanComponentComponent', () => {
  let component: PlanComponentComponent;
  let fixture: ComponentFixture<PlanComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanComponentComponent]
    });
    fixture = TestBed.createComponent(PlanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
