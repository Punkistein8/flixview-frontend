import { TestBed } from '@angular/core/testing';

import { UserflixServiceService } from './userflix-service.service';

describe('UserflixServiceService', () => {
  let service: UserflixServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserflixServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
