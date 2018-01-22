import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '../shared/shared.module';
import { AdminCPRoutingModule } from './admincp-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingsComponent } from './pendings/pendings.component';
import { DetailPendingsComponent } from './pendings/detail/detail-pendings.component';
import { KeysPipe } from './pendings/detail/details.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    AdminCPRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    PendingsComponent,
    DetailPendingsComponent,
    KeysPipe
  ],
  providers: [
    // MagazineService
  ]
})
export class AdminCPModule { }
