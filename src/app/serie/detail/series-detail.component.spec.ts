import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../../shared/shared.module';
import { SeriesDetailComponent } from './series-detail.component';
import { SerieService } from './../../services/serie.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

describe('SeriesDetailComponent', () => {
  let component: SeriesDetailComponent;
  let fixture: ComponentFixture<SeriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          NgbModule,
          SharedModule,
          RouterTestingModule,
        ],
        declarations: [SeriesDetailComponent],
        providers: [
          SerieService,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDetailComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
