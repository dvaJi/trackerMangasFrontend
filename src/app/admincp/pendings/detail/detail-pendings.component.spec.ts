import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../../../shared/shared.module';
import { DetailPendingsComponent } from './detail-pendings.component';
import { ScanService } from './../../../services/scan.service';
import { MagazineService } from './../../../services/magazine.service';
import { ReleaseService } from './../../../services/release.service';
import { SerieService } from './../../../services/serie.service';
import { StaffService } from './../../../services/staff.service';
import { AuthenticationService } from './../../../core/authentication/authentication.service';
import { KeysPipe } from './details.pipe';

describe('DetailPendingsComponent', () => {
  let component: DetailPendingsComponent;
  let fixture: ComponentFixture<DetailPendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          RouterTestingModule,
          FormsModule,
          NgbModule.forRoot()
        ],
        declarations: [DetailPendingsComponent, KeysPipe
        ],
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
    fixture = TestBed.createComponent(DetailPendingsComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.fakeCredential();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
