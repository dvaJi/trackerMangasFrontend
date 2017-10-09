import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { NgDatepickerModule } from 'ng2-datepicker';
import { SharedModule } from '../shared/shared.module';
import { ScanRoutingModule } from './scan-routing.module';
import { ScanComponent } from './scan.component';
import { ScanFormComponent } from './form/scan-form.component';
import { ScanService } from './scan.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    ScanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule
  ],
  declarations: [
    ScanComponent,
    ScanFormComponent
  ],
  providers: [
    ScanService
  ]
})
export class ScanModule { }
