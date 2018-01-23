import { BrowseState, SerieState } from './browse.state';
import { Serie } from '@app/models';

import { Action } from '@ngrx/store';

export const GET_TRENDING_THIS_WEEK = '[Serie] GET_TRENDING_THIS_WEEK';
export const GET_TRENDING_THIS_WEEK_SUCCESS = '[Serie] GET_TRENDING_THIS_WEEK_SUCCESS';
export const GET_TRENDING_THIS_WEEK_ERROR = '[Serie] GET_TRENDING_THIS_WEEK_ERROR';

export const GET_RECENTLY_ADDED = '[Serie] GET_RECENTLY_ADDED';
export const GET_RECENTLY_ADDED_SUCCESS = '[Serie] GET_RECENTLY_ADDED_SUCCESS';
export const GET_RECENTLY_ADDED_ERROR = '[Serie] GET_RECENTLY_ADDED_ERROR';

export const GET_HIGH_RATED_SERIES = '[Serie] GET_HIGH_RATED_SERIES';
export const GET_HIGH_RATED_SERIES_SUCCESS = '[Serie] GET_HIGH_RATED_SERIES_SUCCESS';
export const GET_HIGH_RATED_SERIES_ERROR = '[Serie] GET_HIGH_RATED_SERIES_ERROR';

export const GET_MOST_POPULAR_SERIES = '[Serie] GET_MOST_POPULAR_SERIES';
export const GET_MOST_POPULAR_SERIES_SUCCESS = '[Serie] GET_MOST_POPULAR_SERIES_SUCCESS';
export const GET_MOST_POPULAR_SERIES_ERROR = '[Serie] GET_MOST_POPULAR_SERIES_ERROR';

export const GET_TRENDING_THIS_MONTH = '[Serie] GET_TRENDING_THIS_MONTH';
export const GET_TRENDING_THIS_MONTH_SUCCESS = '[Serie] GET_TRENDING_THIS_MONTH_SUCCESS';
export const GET_TRENDING_THIS_MONTH_ERROR = '[Serie] GET_TRENDING_THIS_MONTH_ERROR';

// TRENDING THIS WEEK
export class GetTrendingThisWeek implements Action {
    readonly type = GET_TRENDING_THIS_WEEK;
}

export class GetTrendingThisWeekSuccess implements Action {
    readonly type = GET_TRENDING_THIS_WEEK_SUCCESS;

    constructor(public payload: SerieState[]) { }
}

export class GetTrendingThisWeekError implements Action {
    readonly type = GET_TRENDING_THIS_WEEK_ERROR;
}

// RECENTLY ADDED
export class GetRecentlyAdded implements Action {
    readonly type = GET_RECENTLY_ADDED;
}

export class GetRecentlyAddedSuccess implements Action {
    readonly type = GET_RECENTLY_ADDED_SUCCESS;

    constructor(public payload: SerieState[]) { }
}

export class GetRecentlyAddedError implements Action {
    readonly type = GET_RECENTLY_ADDED_ERROR;
}

// HIGH RATED
export class GetHighRatedSeries implements Action {
    readonly type = GET_HIGH_RATED_SERIES;
}

export class GetHighRatedSeriesSuccess implements Action {
    readonly type = GET_HIGH_RATED_SERIES_SUCCESS;

    constructor(public payload: SerieState[]) { }
}

export class GetHighRatedSeriesError implements Action {
    readonly type = GET_HIGH_RATED_SERIES_ERROR;
}

// MOST POPULAR
export class GetMostPopularSeries implements Action {
    readonly type = GET_MOST_POPULAR_SERIES;
}

export class GetMostPopularSeriesSuccess implements Action {
    readonly type = GET_MOST_POPULAR_SERIES_SUCCESS;

    constructor(public payload: SerieState[]) { }
}

export class GetMostPopularSeriesError implements Action {
    readonly type = GET_MOST_POPULAR_SERIES_ERROR;
}

// TRENDING THIS MONTH
export class GetTrendingThisMonth implements Action {
    readonly type = GET_TRENDING_THIS_MONTH;
}

export class GetTrendingThisMonthSuccess implements Action {
    readonly type = GET_TRENDING_THIS_MONTH_SUCCESS;

    constructor(public payload: SerieState[]) { }
}

export class GetTrendingThisMonthError implements Action {
    readonly type = GET_TRENDING_THIS_MONTH_ERROR;
}

export type All = GetTrendingThisWeek | GetTrendingThisWeekSuccess | GetTrendingThisWeekError |
                GetRecentlyAdded | GetRecentlyAddedSuccess | GetRecentlyAddedError |
                GetHighRatedSeries | GetHighRatedSeriesSuccess | GetHighRatedSeriesError |
                GetMostPopularSeries | GetMostPopularSeriesSuccess | GetMostPopularSeriesError |
                GetTrendingThisMonth | GetTrendingThisMonthSuccess | GetTrendingThisMonthError;
