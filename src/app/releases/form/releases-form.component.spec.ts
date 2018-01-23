import { AuthenticationService } from './../../core/authentication/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from '@app/shared';
import { ReleasesFormComponent } from './releases-form.component';
import { ReleaseService, ScanService, SerieService } from '@app/services';

describe('ReleasesFormComponent', () => {
  /*let component: ReleasesFormComponent;
  let fixture: ComponentFixture<ReleasesFormComponent>;*/

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
          ScanService,
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

  /*beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesFormComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.fakeCredential();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
