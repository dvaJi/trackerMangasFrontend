import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { AuthenticationService } from '@app/core';
import { MagazineService } from '@app/services';
import { Magazine } from '@app/models';
import { MagazineMock } from '../../../testing/mock/magazine-mock';

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
    it('should return a magazine', fakeAsync(() => {
      // Arrange
      const mockMagazines: Magazine = MagazineMock.generateMockMagazine();
      const response = new Response(new ResponseOptions({
        body: mockMagazines
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const pollsSubscription = magazineService.getMagazine(1);
      tick();

      // Assert
      pollsSubscription.subscribe((magazine: Magazine) => {
        expect(magazine).toEqual(mockMagazines);
      });
    }));

    it('should return a object in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const magazines = magazineService.getMagazines();
      tick();

      // Assert
      magazines.subscribe((magazine: Magazine) => {
        expect(typeof magazine).toEqual('string');
        expect(magazine).toContain('Error');
      });
    }));
  });
});
