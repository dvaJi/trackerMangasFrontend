import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { ScanService } from './scan.service';
import { Scan } from '../shared/model/scan';

describe('ScanService', () => {
  let scanService: ScanService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScanService,
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
    ScanService,
    MockBackend
  ], (_scanService: ScanService,
      _mockBackend: MockBackend) => {

    scanService = _scanService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getScan', () => {
    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const scans = scanService.getScan();
      tick();

      // Assert
      scans.subscribe((scan: Scan) => {
        expect(typeof scan).toEqual('object');
        expect(scan).toContain('Error');
      });
    }));
  });
});
