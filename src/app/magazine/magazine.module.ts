import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '../shared/shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineListComponent } from './list/magazine-list.component';
import { MagazineDetailComponent } from './detail/magazine-detail.component';
import { MagazineFormComponent } from './form/magazine-form.component';
import { MagazineService } from './../services/magazine.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    MagazineRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MagazineListComponent,
    MagazineDetailComponent,
    MagazineFormComponent
  ],
  providers: [
    MagazineService
  ]
})
export class MagazineModule { }
