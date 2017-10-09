import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { SerieService } from './serie.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

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
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomQuote', () => {
    it('should return a random Chuck Norris quote', fakeAsync(() => {
      // Arrange
      const mockQuote = 'a random quote';
      const response = new Response(new ResponseOptions({
        body: { value: mockQuote }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomQuoteSubscription = serieService.getSeries();
      tick();

      // Assert
      randomQuoteSubscription.subscribe((quote: any) => {
        expect(quote).toEqual(mockQuote);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const randomQuoteSubscription = serieService.getSeries();
      tick();

      // Assert
      randomQuoteSubscription.subscribe((quote: any) => {
        expect(typeof quote).toEqual('string');
        expect(quote).toContain('Error');
      });
    }));
  });
});
