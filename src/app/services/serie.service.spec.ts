import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { SerieService } from './serie.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import Serie from '../models/serie';
import { SerieMock } from '../../../testing/mock/serie-mock';

describe('SerieService', () => {
  let serieService: SerieService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SerieService,
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
    SerieService,
    MockBackend
  ], (_serieService: SerieService,
      _mockBackend: MockBackend) => {

    serieService = _serieService;
    mockBackend = _mockBackend;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getSerie', () => {
    it('should return a Serie', fakeAsync(() => {
      // Arrange
      const mockSerie: Serie = SerieMock.generateMockSerie();
      const response = new Response(new ResponseOptions({
        body: mockSerie
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const serieSubscription = serieService.getSerie({ id: 1});
      tick();

      // Assert
      serieSubscription.subscribe((serie: Serie) => {
        expect(serie).toEqual(mockSerie);
      });
    }));

    it('should return a Serie array', fakeAsync(() => {
      // Arrange
      const mockArraySerie: Serie[] = SerieMock.generateMockSeries();
      const response = new Response(new ResponseOptions({
        body: mockArraySerie
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const seriesSubscription = serieService.getSeries({ type: 'Manga', order: 'created', time: '', limit: 5 });
      tick();

      // Assert
      seriesSubscription.subscribe((series: Serie[]) => {
        expect(series).toEqual(mockArraySerie);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const pollsSubscription = serieService.getSerie({ id: 1});
      tick();

      // Assert
      pollsSubscription.subscribe((serie: Serie) => {
        expect(typeof serie).toEqual('string');
        expect(serie).toContain('No se encontró');
      });
    }));
  });
});
