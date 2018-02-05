import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  GetTrendingThisWeekSuccess,
  GetTrendingThisWeekError,
  TrendingThisWeekTypes
} from '../actions/trendingThisWeek';
import { SerieService } from '@app/services';

@Injectable()
export class TrendingThisWeekEffects {
  @Effect()
  GetTrendingThisWeek$: Observable<Action> = this.actions$.pipe(
    ofType(TrendingThisWeekTypes.GetTrendingThisWeek),
    mergeMap(action =>
      this.serieService
        .getSeries({ type: 'Manga', order: 'popularity', time: 'weekly', limit: 5 })
        .pipe(
          map(series => new GetTrendingThisWeekSuccess(series)),
          catchError(() => of(new GetTrendingThisWeekError()))
        )
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
