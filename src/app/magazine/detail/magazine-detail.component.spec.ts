import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from '@app/shared';
import { MagazineDetailComponent } from './magazine-detail.component';
import { MagazineService } from '@app/services';
import { AuthenticationService } from '@app/core';

describe('MagazineDetailComponent', () => {
  let component: MagazineDetailComponent;
  let fixture: ComponentFixture<MagazineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          RouterTestingModule
        ],
        declarations: [MagazineDetailComponent],
        providers: [
          MagazineService,
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
    fixture = TestBed.createComponent(MagazineDetailComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
