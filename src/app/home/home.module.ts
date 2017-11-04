import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PollsService } from './polls.service';
import { NewsService } from './news.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    PollsService,
    NewsService
  ]
})
export class HomeModule { }
