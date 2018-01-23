import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '@app/shared';
import { ReleasesRoutingModule } from './releases-routing.module';
import { ReleasesComponent } from './releases.component';
import { ReleasesFormComponent } from './form/releases-form.component';
import { ReleaseService } from '@app/services';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    ReleasesRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
