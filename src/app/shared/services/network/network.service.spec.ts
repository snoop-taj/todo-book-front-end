import { TestBed, inject } from '@angular/core/testing';

import { NetworkService } from './network.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '..';
import { RouterTestingModule } from '@angular/router/testing';

describe('NetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkService, AuthService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  fit('should be created', inject([NetworkService], (service: NetworkService) => {
    expect(service).toBeTruthy();
  }));
});
