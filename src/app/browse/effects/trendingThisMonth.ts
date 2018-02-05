import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  GetTrendingThisMonthSuccess,
  GetTrendingThisMonthError,
  TrendingThisMonthActionTypes
} from '../actions/trendingThisMonth';
import { SerieService } from '@app/services';

@Injectable()
export class TrendingThisMonthEffects {
  @Effect()
  GetTrendingThisMonth$: Observable<Action> = this.actions$.pipe(
    ofType(TrendingThisMonthActionTypes.GetTrendingThisMonth),
    mergeMap(action =>
      this.serieService
        .getSeries({ type: 'Manga', order: 'popularity', time: 'month', limit: 5 })
        .pipe(
          map(series => new GetTrendingThisMonthSuccess(series)),
          catchError(() => of(new GetTrendingThisMonthError()))
        )
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
