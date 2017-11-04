import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { PollsService } from './polls.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { Poll, Answers } from './poll';

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
    authenticationService.guessCredentials = 'test';
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getPolls', () => {
    it('should return a poll', fakeAsync(() => {
      // Arrange
      const mockQuotes: Poll[] = [];
      const randomAnswers: Answers[] = [];

      const answerOne: Answers = { id: 1, answer: 'Dunno', votes: 0 };
      const answerTwo: Answers = { id: 2, answer: 'Maybe', votes: 1 };
      randomAnswers.push(answerOne, answerTwo);

      const poll1: Poll = {
        id: 1,
        title: 'First Poll',
        description: 'The first Poll',
        question: 'Why?',
        active: true,
        totalVotes: 1,
        answers: randomAnswers
      };
      const poll2: Poll = {
        id: 2,
        title: 'Second Poll',
        description: 'The SeconD Poll',
        question: 'Nani?!',
        active: true,
        totalVotes: 1,
        answers: randomAnswers
      };
      mockQuotes.push(poll1, poll2);
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
