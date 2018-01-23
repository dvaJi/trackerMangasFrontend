import { BrowseState, SerieState } from './browse.state';
import { environment } from '../../environments/environment';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as BrowseActions from './browse.action';
import { SerieService } from '@app/services';


@Injectable()
export class BrowseEffects {

    @Effect()
    GetTrendingThisWeek$: Observable<Action> = this.actions$.
        ofType<BrowseActions.GetTrendingThisWeek>(BrowseActions.GET_TRENDING_THIS_WEEK)
        .pipe(mergeMap(action =>
            this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: 'weekly', limit: 5 })
                .pipe(
                map(series => new BrowseActions.GetTrendingThisWeekSuccess(series as SerieState[])),
                catchError(() => of(new BrowseActions.GetTrendingThisWeekError()))
                )
        ));

    @Effect()
    GetRecentlyAdded$: Observable<Action> = this.actions$.
        ofType<BrowseActions.GetRecentlyAdded>(BrowseActions.GET_RECENTLY_ADDED)
        .pipe(mergeMap(action =>
            this.serieService.getSeries({ type: 'Manga', order: 'created', time: '', limit: 5 })
                .pipe(map(series => new BrowseActions.GetRecentlyAddedSuccess(series as SerieState[])),
                catchError(() => of(new BrowseActions.GetRecentlyAddedError()))
                )
        ));

    @Effect()
    GetHighRatedSeries$: Observable<Action> = this.actions$.
        ofType<BrowseActions.GetHighRatedSeries>(BrowseActions.GET_HIGH_RATED_SERIES)
        .pipe(mergeMap(action =>
            this.serieService.getSeries({ type: 'Manga', order: 'rated', time: '', limit: 5 })
                .pipe(
                map(series => new BrowseActions.GetHighRatedSeriesSuccess(series as SerieState[])),
                catchError(() => of(new BrowseActions.GetHighRatedSeriesError()))
                )
        ));

    @Effect()
    GetMostPopularSeries$: Observable<Action> = this.actions$.
        ofType<BrowseActions.GetMostPopularSeries>(BrowseActions.GET_MOST_POPULAR_SERIES)
        .pipe(mergeMap(action =>
            this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: '', limit: 5 })
                .pipe(
                map(series => new BrowseActions.GetMostPopularSeriesSuccess(series as SerieState[])),
                catchError(() => of(new BrowseActions.GetMostPopularSeriesError()))
                )
        ));

    @Effect()
    GetTrendingThisMonth$: Observable<Action> = this.actions$.
        ofType<BrowseActions.GetTrendingThisMonth>(BrowseActions.GET_TRENDING_THIS_MONTH)
        .pipe(mergeMap(action =>
            this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: 'month', limit: 5 })
                .pipe(
                map(series => new BrowseActions.GetTrendingThisMonthSuccess(series as SerieState[])),
                catchError(() => of(new BrowseActions.GetTrendingThisMonthError()))
                )
        ));

    constructor(private actions$: Actions, private serieService: SerieService) { }

}
