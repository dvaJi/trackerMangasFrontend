import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { CustomRouterStateSerializer } from './shared/utils';

import { environment } from '@env/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { BrowseModule } from './browse/browse.module';
import { SeriesModule } from './serie/series.module';
import { ReleasesModule } from './releases/releases.module';
import { StaffModule } from './staff/staff.module';
import { MagazineModule } from './magazine/magazine.module';
import { ScanModule } from './scan/scan.module';
import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';
import { AdminCPModule } from './admincp/admincp.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'TrackerMangas Store DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    CoreModule,
    SharedModule,
    HomeModule,
    BrowseModule,
    ReleasesModule,
    StaffModule,
    MagazineModule,
    ScanModule,
    SeriesModule,
    AboutModule,
    AuthModule,
    AdminCPModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
