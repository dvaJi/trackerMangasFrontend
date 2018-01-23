import { AuthenticationService } from './../../core/authentication/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from '@app/shared';
import { StaffFormComponent } from './staff-form.component';
import { StaffService } from '@app/services';

describe('StaffFormComponent', () => {
  let component: StaffFormComponent;
  let fixture: ComponentFixture<StaffFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          ReactiveFormsModule,
          NgbModule.forRoot(),
          FormsModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
          TagInputModule
        ],
        declarations: [StaffFormComponent],
        providers: [
          StaffService,
          AuthenticationService,
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
    fixture = TestBed.createComponent(StaffFormComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
