import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Serie, Staff, SerieChangelog } from '@app/models';
import { SerieService } from '@app/services';

import * as fromSerieDetail from '../../actions/serie-detail';
import * as fromSeries from '../../reducers';

@Component({
  selector: 'app-series-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.scss']
})
export class SeriesDetailComponent implements OnInit {
  serie$: Observable<Serie>;
  loading$: Observable<boolean>;
  serieChangelog$: Observable<SerieChangelog[]>;
  serieTab = 'info';

  constructor(private store: Store<fromSeries.State>, private route: ActivatedRoute) {
    this.serie$ = store.pipe(select(fromSeries.getSerieDetail));
    this.loading$ = store.pipe(select(fromSeries.getSerieDetailLoading));
    this.serieChangelog$ = store.pipe(select(fromSeries.getSerieChangelog));
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new fromSerieDetail.GetSerie(id));
  }

  changeTab(tab: string) {
    if (tab === 'history') {
      this.store.dispatch(new fromSerieDetail.GetSerieHistory(Number(this.route.snapshot.paramMap.get('id'))));
    }
    this.serieTab = tab;
  }
}
