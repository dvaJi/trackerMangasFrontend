import { Serie } from '@app/models';
import { Action } from '@ngrx/store';

export enum TrendingThisMonthActionTypes {
    GetTrendingThisMonth = '[Browse] Get Trending This Month',
    GetTrendingThisMonthSuccess = '[Browse] Get Trending This Month Success',
    GetTrendingThisMonthError = '[Browse] Get Trending This Month Error',
}

// TRENDING THIS MONTH
export class GetTrendingThisMonth implements Action {
    readonly type = TrendingThisMonthActionTypes.GetTrendingThisMonth;
}

export class GetTrendingThisMonthSuccess implements Action {
    readonly type = TrendingThisMonthActionTypes.GetTrendingThisMonthSuccess;

    constructor(public payload: Serie[]) { }
}

export class GetTrendingThisMonthError implements Action {
    readonly type = TrendingThisMonthActionTypes.GetTrendingThisMonthError;
}

export type TrendingThisMonthActions = GetTrendingThisMonth | GetTrendingThisMonthSuccess | GetTrendingThisMonthError;
