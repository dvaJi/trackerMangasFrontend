import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './list/series.component';
import { SeriesDetailComponent } from './containers/detail/series-detail.component';
import { SerieFormComponent } from './containers/form/serie-form.component';
import { SeriesComponentsModule } from './components';

import { reducers } from './reducers';
import { SerieDetailEffects } from './effects/serie-detail';
import { SerieFormEffects } from './effects/serie-form';

import { SerieService } from '@app/services';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    SeriesRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SeriesComponentsModule,
    StoreModule.forFeature('series', reducers),
    EffectsModule.forFeature([SerieDetailEffects, SerieFormEffects])
  ],
  declarations: [SeriesComponent, SerieFormComponent, SeriesDetailComponent],
  providers: [SerieService]
})
export class SeriesModule {}
