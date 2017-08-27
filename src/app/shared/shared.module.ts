import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { CoverComponent } from './cover-bg/cover.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    CoverComponent
  ],
  exports: [
    LoaderComponent,
    CoverComponent
  ]
})
export class SharedModule { }
