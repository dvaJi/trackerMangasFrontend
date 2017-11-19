import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { StaffService } from './staff.service';
import Staff from './../models/staff';
import { AuthenticationService } from '../core/authentication/authentication.service';

describe('StaffService', () => {
  let staffService: StaffService;
  let authenticationService: AuthenticationService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StaffService,
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([
    StaffService,
    MockBackend
  ], (_staffService: StaffService,
      _authenticationService: AuthenticationService,
      _mockBackend: MockBackend) => {

    staffService = _staffService;
    authenticationService = _authenticationService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  /* describe('getStaff', () => {
    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((c: MockConnection) => c.mockError(response as any));

      // Act
      authenticationService.guessCredentials = 'Test';
      const staffs = staffService.getStaff();
      tick();

      // Assert
      staffs.subscribe((staff: Staff) => {
        expect(staff).toContain('Error');
      });
    }));
  });*/
});
