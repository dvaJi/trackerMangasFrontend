import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { GetHighRatedSeriesSuccess, GetHighRatedSeriesError, HighRatedSeriesTypes } from '../actions/highRatedSeries';
import { SerieService } from '@app/services';

@Injectable()
export class HighRatedSeriesEffects {
  @Effect()
  GetHighRatedSeries$: Observable<Action> = this.actions$.pipe(
    ofType(HighRatedSeriesTypes.GetHighRatedSeries),
    mergeMap(action =>
      this.serieService
        .getSeries({ type: 'Manga', order: 'rated', time: '', limit: 5 })
        .pipe(map(series => new GetHighRatedSeriesSuccess(series)), catchError(() => of(new GetHighRatedSeriesError())))
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
