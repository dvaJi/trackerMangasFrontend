import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { PollsService } from '@app/services';
import { AuthenticationService } from '@app/core';
import { Poll } from '@app/models';

describe('PollsService', () => {
  let quoteService: PollsService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollsService,
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
    PollsService,
    MockBackend
  ], (_quoteService: PollsService,
      _mockBackend: MockBackend) => {

    quoteService = _quoteService;
    mockBackend = _mockBackend;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.fakeCredential();
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getPolls', () => {
    it('should return a poll', fakeAsync(() => {
      // Arrange
      const mockQuotes: Poll[] = Poll.generateMockPolls();
      const response = new Response(new ResponseOptions({
        body: mockQuotes
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const pollsSubscription = quoteService.getPolls({ active: true, latest: true });
      tick();

      // Assert
      pollsSubscription.subscribe((quote: Poll[]) => {
        expect(quote).toEqual(mockQuotes);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const pollsSubscription = quoteService.getPolls({ latest: false });
      tick();

      // Assert
      pollsSubscription.subscribe((polls: Poll[]) => {
        expect(typeof polls).toEqual('string');
      });
    }));
  });
});
