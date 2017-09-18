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
import { DatePickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

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
    DatePickerModule
  ],
  declarations: [
    SeriesComponent,
    SerieFormComponent,
    FileSelectDirective
  ],
  providers: [
    SerieService
  ]
})
export class SeriesModule { }
