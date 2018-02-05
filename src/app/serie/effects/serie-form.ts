import { environment } from '@env/environment';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  FormActionTypes,
  SubmitGetSerie,
  SubmitGetSerieFailure,
  SubmitGetSerieSuccess,
  Submit,
  SubmitSuccess,
  SubmitFailure,
  GetGenresSuccess,
  GetGenresFailure,
  GetDemographicsSuccess,
  GetDemographicsFailure,
  GetGenres
} from '../actions/serie-form';
import { SerieService } from '@app/services';
import { getDemographics } from '@app/serie/reducers';
import { Serie } from '@app/models';

@Injectable()
export class SerieFormEffects {
  @Effect()
  Submit$ = this.actions$.pipe(
    ofType(FormActionTypes.Submit),
    map((action: Submit) => action.payload),
    exhaustMap((serie: Serie) =>
      this.serieService
        .setSerie(serie)
        .pipe(map(response => new SubmitSuccess(response)), catchError(error => of(new SubmitFailure(error))))
    )
  );

  @Effect()
  SubmitGetSerie$: Observable<Action> = this.actions$.pipe(
    ofType<SubmitGetSerie>(FormActionTypes.SubmitGetSerie),
    mergeMap(action =>
      this.serieService
        .getSerie({ id: action.payload })
        .pipe(map(serie => new SubmitGetSerieSuccess(serie)), catchError(error => of(new SubmitGetSerieFailure(error))))
    )
  );

  @Effect()
  GetGenres$: Observable<Action> = this.actions$.pipe(
    ofType<GetGenres>(FormActionTypes.GetGenres),
    mergeMap(action =>
      this.serieService
        .getGenres({ id: action.payload })
        .pipe(map(genres => new GetGenresSuccess(genres)), catchError(error => of(new GetGenresFailure(error))))
    )
  );

  @Effect()
  GetDemographics$: Observable<Action> = this.actions$.pipe(
    ofType(FormActionTypes.GetDemographics),
    mergeMap(action =>
      this.serieService
        .getDemographics()
        .pipe(
          map(demographics => new GetDemographicsSuccess(demographics)),
          catchError(error => of(new GetDemographicsFailure(error)))
        )
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
