import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleComponentComponent } from './role-component.component';

describe('RoleComponentComponent', () => {
  let component: RoleComponentComponent;
  let fixture: ComponentFixture<RoleComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleComponentComponent]
    });
    fixture = TestBed.createComponent(RoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
