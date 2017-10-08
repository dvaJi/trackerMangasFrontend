import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { BrowseModule } from './browse/browse.module';
import { SeriesModule } from './serie/series.module';
import { ReleasesModule } from './releases/releases.module';
import { StaffModule } from './staff/staff.module';
import { MagazineModule } from './magazine/magazine.module';
import { ScanModule } from './scan/scan.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
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
    LoginModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
