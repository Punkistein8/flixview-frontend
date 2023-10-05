import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserflixComponentComponent } from './userflix-component.component';

describe('UserflixComponentComponent', () => {
  let component: UserflixComponentComponent;
  let fixture: ComponentFixture<UserflixComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserflixComponentComponent]
    });
    fixture = TestBed.createComponent(UserflixComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
