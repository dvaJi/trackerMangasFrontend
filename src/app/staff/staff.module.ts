import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { NgDatepickerModule } from 'ng2-datepicker';
import { SharedModule } from '../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './list/staff.component';
import { StaffDetailComponent } from './detail/staff-detail.component';
import { StaffFormComponent } from './form/staff-form.component';
import { StaffService } from './staff.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule
  ],
  declarations: [
    StaffComponent,
    StaffDetailComponent,
    StaffFormComponent
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
