import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared';
import { PendingsComponent } from './pendings.component';
import { ScanService, MagazineService, ReleaseService, SerieService, StaffService } from '@app/services';
import { AuthenticationService } from '@app/core';

describe('PendingsComponent', () => {
  let component: PendingsComponent;
  let fixture: ComponentFixture<PendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      declarations: [PendingsComponent],
      providers: [
        ScanService,
        MagazineService,
        ReleaseService,
        SerieService,
        StaffService,
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
    fixture = TestBed.createComponent(PendingsComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.fakeCredential();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
