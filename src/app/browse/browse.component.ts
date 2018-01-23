import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BrowseState, SerieState } from './browse.state';
import { Store } from '@ngrx/store';
import { Serie } from '@app/models';

import * as BrowseAction from './browse.action';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isLoading: boolean;
  browseSeries$: Observable<BrowseState>;

  constructor(private store: Store<BrowseState>) { }

  ngOnInit() {
    this.browseSeries$ = this.store.select(state => state);
    this.store.dispatch(new BrowseAction.GetTrendingThisWeek());
    this.store.dispatch(new BrowseAction.GetHighRatedSeries());
    this.store.dispatch(new BrowseAction.GetRecentlyAdded());
    this.store.dispatch(new BrowseAction.GetTrendingThisMonth());
    this.store.dispatch(new BrowseAction.GetMostPopularSeries());
  }

}
