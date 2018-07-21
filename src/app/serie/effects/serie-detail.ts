import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  GetSerie,
  GetSerieSuccess,
  GetSerieError,
  GetSerieHistory,
  GetSerieHistoryError,
  GetSerieHistorySuccess,
  SerieDetailActionTypes
} from '../actions/serie-detail';
import { SerieService } from '@app/services';

@Injectable()
export class SerieDetailEffects {
  @Effect()
  GetSerie$: Observable<Action> = this.actions$.pipe(
    ofType<GetSerie>(SerieDetailActionTypes.GetSerie),
    mergeMap(action =>
      this.serieService
        .getSerie({ id: action.payload })
        .pipe(map(serie => new GetSerieSuccess(serie)), catchError(() => of(new GetSerieError())))
    )
  );

  @Effect()
  GetSerieHistory$: Observable<Action> = this.actions$.pipe(
    ofType<GetSerieHistory>(SerieDetailActionTypes.GetSerieHistory),
    mergeMap(action =>
      this.serieService
        .getHistory({ id: action.payload })
        .pipe(map(changelog => new GetSerieHistorySuccess(changelog)), catchError(() => of(new GetSerieHistoryError())))
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
