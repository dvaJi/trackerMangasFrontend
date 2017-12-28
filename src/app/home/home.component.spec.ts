import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { PollsService } from './../services/polls.service';
import { NewsService } from './../services/news.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

describe('HomeComponent', () => {
  /*let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NgbModule.forRoot()
        ],
        declarations: [HomeComponent],
        providers: [
          PollsService,
          NewsService,
          AuthenticationService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http, AuthenticationService,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      })
      .compileComponents();
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    const request = authenticationService.login({
      username: 'toto',
      password: '123'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
