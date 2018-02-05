import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Serie } from '@app/models';

import * as fromTrendingThisWeek from '../../actions/trendingThisWeek';
import * as fromHighRatedSeries from '../../actions/highRatedSeries';
import * as fromMostPopularSeries from '../../actions/mostPopularSeries';
import * as fromRecentlyAdded from '../../actions/recentlyAdded';
import * as fromTrendingThisMonth from '../../actions/trendingThisMonth';
import * as fromBrowse from '../../reducers';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isLoading: boolean;
  trendingThisWeek$: Observable<Serie[]>;
  highRatedSeries$: Observable<Serie[]>;
  recentlyAdded$: Observable<Serie[]>;
  trendingThisMonth$: Observable<Serie[]>;
  mostPopularseries$: Observable<Serie[]>;

  constructor(private store: Store<fromBrowse.State>) {
    this.trendingThisWeek$ = store.pipe(select(fromBrowse.getTrendingThisWeekSeries));
    this.highRatedSeries$ = store.pipe(select(fromBrowse.getHighRatedSeries));
    this.recentlyAdded$ = store.pipe(select(fromBrowse.getRecentlyAddedSeries));
    this.trendingThisMonth$ = store.pipe(select(fromBrowse.getTrendingThisMonthSeries));
    this.mostPopularseries$ = store.pipe(select(fromBrowse.getMostPopularSeries));
  }

  ngOnInit() {
    this.store.dispatch(new fromTrendingThisWeek.GetTrendingThisWeek());
    this.store.dispatch(new fromHighRatedSeries.GetHighRatedSeries());
    this.store.dispatch(new fromRecentlyAdded.GetRecentlyAdded());
    this.store.dispatch(new fromTrendingThisMonth.GetTrendingThisMonth());
    this.store.dispatch(new fromMostPopularSeries.GetMostPopularSeries());
  }

}
