import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule } from '@ngx-translate/core';

import { SeriePortraitComponent } from './serie-portrait';
import { SerieInfoComponent } from './serie-info';
import { SerieChaptersComponent } from './serie-chapters';
import { SerieHistoryComponent } from './serie-history';
import { SerieHistoryDetailComponent } from './serie-history-detail';
import { SerieFormComponent } from './serie-form';

export const COMPONENTS = [
  SeriePortraitComponent,
  SerieInfoComponent,
  SerieChaptersComponent,
  SerieHistoryComponent,
  SerieHistoryDetailComponent,
  SerieFormComponent
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule.forRoot(), TagInputModule, TranslateModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SeriesComponentsModule {}
