import { Serie } from '@app/models';
import { Action } from '@ngrx/store';

export enum TrendingThisWeekTypes {
    GetTrendingThisWeek = '[Browse] Get Trending This Week',
    GetTrendingThisWeekSuccess = '[Browse] Get Trending This Week Success',
    GetTrendingThisWeekError = '[Browse] Get Trending This Week Error',
}

// TRENDING THIS WEEK
export class GetTrendingThisWeek implements Action {
    readonly type = TrendingThisWeekTypes.GetTrendingThisWeek;
}

export class GetTrendingThisWeekSuccess implements Action {
    readonly type = TrendingThisWeekTypes.GetTrendingThisWeekSuccess;

    constructor(public payload: Serie[]) { }
}

export class GetTrendingThisWeekError implements Action {
    readonly type = TrendingThisWeekTypes.GetTrendingThisWeekError;
}

export type TrendingThisWeekActions = GetTrendingThisWeek | GetTrendingThisWeekSuccess | GetTrendingThisWeekError;