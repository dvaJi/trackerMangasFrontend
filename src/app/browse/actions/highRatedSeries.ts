import { Serie } from '@app/models';
import { Action } from '@ngrx/store';

export enum HighRatedSeriesTypes {
    GetHighRatedSeries = '[Browse] Get High Rated Series',
    GetHighRatedSeriesSuccess = '[Browse] Get High Rated Series Success',
    GetHighRatedSeriesError = '[Browse] Get High Rated Series Error',
}

// HIGH RATED
export class GetHighRatedSeries implements Action {
    readonly type = HighRatedSeriesTypes.GetHighRatedSeries;
}

export class GetHighRatedSeriesSuccess implements Action {
    readonly type = HighRatedSeriesTypes.GetHighRatedSeriesSuccess;

    constructor(public payload: Serie[]) { }
}

export class GetHighRatedSeriesError implements Action {
    readonly type = HighRatedSeriesTypes.GetHighRatedSeriesError;
}

export type HighRatedSeriesActions = GetHighRatedSeries | GetHighRatedSeriesSuccess | GetHighRatedSeriesError;
