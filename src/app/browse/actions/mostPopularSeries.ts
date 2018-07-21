import { Serie } from '@app/models';
import { Action } from '@ngrx/store';

export enum MostPopularSeriesActionTypes {
    GetMostPopularSeries = '[Browse] Get Most Popular Series',
    GetMostPopularSeriesSuccess = '[Browse] Get Most Popular Series Success',
    GetMostPopularSeriesError = '[Browse] Get Most Popular Series Error',
}

// MOST POPULAR
export class GetMostPopularSeries implements Action {
    readonly type = MostPopularSeriesActionTypes.GetMostPopularSeries;
}

export class GetMostPopularSeriesSuccess implements Action {
    readonly type = MostPopularSeriesActionTypes.GetMostPopularSeriesSuccess;

    constructor(public payload: Serie[]) { }
}

export class GetMostPopularSeriesError implements Action {
    readonly type = MostPopularSeriesActionTypes.GetMostPopularSeriesError;
}

export type MostPopularSeriesActions = GetMostPopularSeries | GetMostPopularSeriesSuccess | GetMostPopularSeriesError;
