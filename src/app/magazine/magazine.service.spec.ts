import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { AuthenticationService } from '../core/authentication/authentication.service';
import { MagazineService } from './magazine.service';
import { Magazine } from '../shared/model/magazine';

describe('MagazineService', () => {
  let magazineService: MagazineService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MagazineService,
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
    MagazineService,
    MockBackend
  ], (_magazineService: MagazineService,
      _mockBackend: MockBackend) => {

    magazineService = _magazineService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getMagazine', () => {
    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const magazines = magazineService.getMagazine();
      tick();

      // Assert
      magazines.subscribe((magazine: Magazine) => {
        expect(typeof magazine).toEqual('string');
        expect(magazine).toContain('Error');
      });
    }));
  });
});
