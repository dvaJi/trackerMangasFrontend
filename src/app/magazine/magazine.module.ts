import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { TagInputModule } from 'ngx-chips';
import { NgDatepickerModule } from 'ng2-datepicker';
import { SharedModule } from '../shared/shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';
import { MagazineFormComponent } from './form/magazine-form.component';
import { MagazineService } from './magazine.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TagInputModule,
    MagazineRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule
  ],
  declarations: [
    MagazineComponent,
    MagazineFormComponent
  ],
  providers: [
    MagazineService
  ]
})
export class MagazineModule { }
