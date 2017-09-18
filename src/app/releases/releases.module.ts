import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ReleasesRoutingModule } from './releases-routing.module';
import { ReleasesComponent } from './releases.component';
import { ReleaseService } from './release.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ReleasesRoutingModule
  ],
  declarations: [
    ReleasesComponent
  ],
  providers: [
    ReleaseService
  ]
})
export class ReleasesModule { }
