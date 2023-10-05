import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoonMoviesComponent } from './cartoon-movies.component';

describe('CartoonMoviesComponent', () => {
  let component: CartoonMoviesComponent;
  let fixture: ComponentFixture<CartoonMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartoonMoviesComponent]
    });
    fixture = TestBed.createComponent(CartoonMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
