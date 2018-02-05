import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './containers/browse/browse.component';
import { BrowseComponentsModule } from './components';

import { SerieService } from '@app/services';

import { reducers } from './reducers';
import { HighRatedSeriesEffects } from './effects/highRatedSeries';
import { MostPopularSeriesEffects } from './effects/mostPopularSeries';
import { RecentlyAddedEffects } from './effects/recentlyAdded';
import { TrendingThisMonthEffects } from './effects/trendingThisMonth';
import { TrendingThisWeekEffects } from './effects/trendingThisWeek';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    BrowseRoutingModule,
    BrowseComponentsModule,
    StoreModule.forFeature('browse', reducers),
    EffectsModule.forFeature([
      HighRatedSeriesEffects,
      MostPopularSeriesEffects,
      RecentlyAddedEffects,
      TrendingThisMonthEffects,
      TrendingThisWeekEffects
    ])
  ],
  declarations: [BrowseComponent],
  providers: [SerieService]
})
export class BrowseModule {}
