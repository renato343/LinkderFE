import { TestBed, inject } from '@angular/core/testing';

import { AuthJWTService } from './auth.jwt.service';

describe('AuthJWTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthJWTService]
    });
  });

  it('should be created', inject([AuthJWTService], (service: AuthJWTService) => {
    expect(service).toBeTruthy();
  }));
});
