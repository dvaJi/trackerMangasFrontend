import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { NgDatepickerModule } from 'ng2-datepicker';
import { SharedModule } from '../shared/shared.module';
import { ReleasesRoutingModule } from './releases-routing.module';
import { ReleasesComponent } from './releases.component';
import { ReleasesFormComponent } from './form/releases-form.component';
import { ReleaseService } from './release.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    ReleasesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule
  ],
  declarations: [
    ReleasesComponent,
    ReleasesFormComponent
  ],
  providers: [
    ReleaseService
  ]
})
export class ReleasesModule { }
