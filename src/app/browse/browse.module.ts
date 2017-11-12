import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { SerieService } from './../services/serie.service';

import * as BrowseReducer from './browse.reducer';
import { BrowseEffects } from './browse.effects';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    BrowseRoutingModule,
    StoreModule.forRoot({series: BrowseReducer.BrowseReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([BrowseEffects])
  ],
  declarations: [
    BrowseComponent
  ],
  providers: [
    SerieService
  ]
})
export class BrowseModule { }
