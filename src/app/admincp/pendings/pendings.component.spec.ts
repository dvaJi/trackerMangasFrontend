import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../../shared/shared.module';
import { PendingsComponent } from './pendings.component';
import { ScanService } from './../../services/scan.service';
import { MagazineService } from './../../services/magazine.service';
import { ReleaseService } from './../../services/release.service';
import { SerieService } from './../../services/serie.service';
import { StaffService } from './../../services/staff.service';
import { AuthenticationService } from './../../core/authentication/authentication.service';

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
