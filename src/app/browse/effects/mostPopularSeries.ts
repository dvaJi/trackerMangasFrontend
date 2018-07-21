import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  GetMostPopularSeriesSuccess,
  GetMostPopularSeriesError,
  MostPopularSeriesActionTypes
} from '../actions/mostPopularSeries';
import { SerieService } from '@app/services';

@Injectable()
export class MostPopularSeriesEffects {
  @Effect()
  GetMostPopularSeries$: Observable<Action> = this.actions$.pipe(
    ofType(MostPopularSeriesActionTypes.GetMostPopularSeries),
    mergeMap(action =>
      this.serieService
        .getSeries({ type: 'Manga', order: 'popularity', time: '', limit: 5 })
        .pipe(
          map(series => new GetMostPopularSeriesSuccess(series)),
          catchError(() => of(new GetMostPopularSeriesError()))
        )
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
