import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { PollComponent } from './poll/poll.component';
import { CoverComponent } from './cover-bg/cover.component';

@NgModule({
  imports: [CommonModule, NgbModule, FormsModule, RouterModule],
  declarations: [LoaderComponent, PollComponent, CoverComponent],
  exports: [LoaderComponent, PollComponent, CoverComponent]
})
export class SharedModule {}
