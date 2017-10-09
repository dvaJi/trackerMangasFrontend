import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { SerieFormComponent } from './form/serie-form.component';
import { SerieService } from './serie.service';
import { TagInputModule } from 'ngx-chips';
import { NgDatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    SeriesRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule
  ],
  declarations: [
    SeriesComponent,
    SerieFormComponent
  ],
  providers: [
    SerieService
  ]
})
export class SeriesModule { }
