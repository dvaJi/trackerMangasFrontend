import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { NewsService } from '@app/services';
import { AuthenticationService } from '@app/core';
import { News } from '@app/models';

describe('NewsService', () => {
  let newsService: NewsService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsService,
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
    NewsService,
    MockBackend
  ], (_newsService: NewsService,
      _mockBackend: MockBackend) => {

    newsService = _newsService;
    mockBackend = _mockBackend;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getNews', () => {
    it('should return a news', fakeAsync(() => {
      // Arrange
      const mockNews: News = News.generateMockNews();
      const response = new Response(new ResponseOptions({
        body: mockNews
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const pollsSubscription = newsService.getNews({ id: 1, stub: 'fake_news' });
      tick();

      // Assert
      pollsSubscription.subscribe((news: News) => {
        expect(news).toEqual(mockNews);
      });
    }));

    it('should return a news array', fakeAsync(() => {
      // Arrange
      const mockArrayNews: News[] = News.generateArrayMockNews();
      const response = new Response(new ResponseOptions({
        body: mockArrayNews
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const pollsSubscription = newsService.getAllNews();
      tick();

      // Assert
      pollsSubscription.subscribe((news: News[]) => {
        expect(news).toEqual(mockArrayNews);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const pollsSubscription = newsService.getNews({ id: 1, stub: 'fake_news' });
      tick();

      // Assert
      pollsSubscription.subscribe((news: News) => {
        expect(typeof news).toEqual('string');
        expect(news).toContain('Error');
      });
    }));
  });
});
