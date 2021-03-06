import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '@app/shared';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './list/staff.component';
import { StaffDetailComponent } from './detail/staff-detail.component';
import { StaffFormComponent } from './form/staff-form.component';
import { StaffService } from '@app/services';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
