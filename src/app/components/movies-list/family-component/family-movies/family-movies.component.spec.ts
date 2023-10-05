import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMoviesComponent } from './family-movies.component';

describe('FamilyMoviesComponent', () => {
  let component: FamilyMoviesComponent;
  let fixture: ComponentFixture<FamilyMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyMoviesComponent]
    });
    fixture = TestBed.createComponent(FamilyMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
