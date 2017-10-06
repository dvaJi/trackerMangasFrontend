import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { StaffService } from './staff.service';
import { Staff } from '../shared/model/staff';

describe('StaffService', () => {
  let staffService: StaffService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StaffService,
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
      _mockBackend: MockBackend) => {

    staffService = _staffService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getStaff', () => {
    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const staffs = staffService.getStaff();
      tick();

      // Assert
      staffs.subscribe((staff: Staff) => {
        expect(typeof staff).toEqual('object');
        expect(staff).toContain('Error');
      });
    }));
  });
});
