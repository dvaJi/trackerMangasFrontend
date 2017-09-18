import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { Release } from './release';

import { ReleaseService } from './release.service';

describe('ReleaseService', () => {
  let releaseService: ReleaseService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReleaseService,
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
    ReleaseService,
    MockBackend
  ], (_releaseService: ReleaseService,
      _mockBackend: MockBackend) => {

    releaseService = _releaseService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getReleases', () => {
    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const releases = releaseService.getReleases();
      tick();

      // Assert
      releases.subscribe((release: Release) => {
        expect(typeof release).toEqual('object');
        expect(release).toContain('Error');
      });
    }));
  });
});
