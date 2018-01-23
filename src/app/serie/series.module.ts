import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './list/series.component';
import { SeriesDetailComponent } from './detail/series-detail.component';
import { SerieFormComponent } from './form/serie-form.component';
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
    ReactiveFormsModule
  ],
  declarations: [
    SeriesComponent,
    SerieFormComponent,
    SeriesDetailComponent
  ],
  providers: [
    SerieService
  ]
})
export class SeriesModule { }
