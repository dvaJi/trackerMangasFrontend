import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '../shared/shared.module';
import { ScanRoutingModule } from './scan-routing.module';
import { ScanListComponent } from './list/scan-list.component';
import { ScanDetailComponent } from './detail/scan-detail.component';
import { ScanFormComponent } from './form/scan-form.component';
import { ScanService } from './scan.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    ScanRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScanListComponent,
    ScanDetailComponent,
    ScanFormComponent
  ],
  providers: [
    ScanService
  ]
})
export class ScanModule { }
