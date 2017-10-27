import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from './../../shared/shared.module';
import { ScanDetailComponent } from './scan-detail.component';
import { ScanService } from './../scan.service';
import { AuthenticationService } from './../../core/authentication/authentication.service';

describe('ScanDetailComponent', () => {
  let component: ScanDetailComponent;
  let fixture: ComponentFixture<ScanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          RouterTestingModule
        ],
        declarations: [ScanDetailComponent],
        providers: [
          ScanService,
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
    fixture = TestBed.createComponent(ScanDetailComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
