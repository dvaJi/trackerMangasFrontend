import { environment } from '@env/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { GetRecentlyAddedSuccess, GetRecentlyAddedError, RecentlyAddedTypes } from '../actions/recentlyAdded';
import { SerieService } from '@app/services';

@Injectable()
export class RecentlyAddedEffects {
  @Effect()
  GetRecentlyAdded$: Observable<Action> = this.actions$.pipe(
    ofType(RecentlyAddedTypes.GetRecentlyAdded),
    mergeMap(action =>
      this.serieService
        .getSeries({ type: 'Manga', order: 'created', time: '', limit: 5 })
        .pipe(map(series => new GetRecentlyAddedSuccess(series)), catchError(() => of(new GetRecentlyAddedError())))
    )
  );

  constructor(private actions$: Actions, private serieService: SerieService) {}
}
