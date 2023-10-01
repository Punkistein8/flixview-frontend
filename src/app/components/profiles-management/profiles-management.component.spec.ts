import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesManagementComponent } from './profiles-management.component';

describe('ProfilesManagementComponent', () => {
  let component: ProfilesManagementComponent;
  let fixture: ComponentFixture<ProfilesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesManagementComponent]
    });
    fixture = TestBed.createComponent(ProfilesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
