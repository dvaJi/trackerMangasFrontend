import { AuthenticationService } from './../../core/authentication/authentication.service';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from '../../shared/shared.module';
import { ReleasesFormComponent } from './releases-form.component';
import { ReleaseService } from '../release.service';
import { SerieService } from './../../serie/serie.service';

describe('ReleasesFormComponent', () => {
  let component: ReleasesFormComponent;
  let fixture: ComponentFixture<ReleasesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          BrowserAnimationsModule,
          ReactiveFormsModule,
          FormsModule,
          NgbModule.forRoot(),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
          TagInputModule
        ],
        declarations: [ReleasesFormComponent],
        providers: [
          ReleaseService,
          AuthenticationService,
          SerieService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http, AuthenticationService, TranslateService,
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
    fixture = TestBed.createComponent(ReleasesFormComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
