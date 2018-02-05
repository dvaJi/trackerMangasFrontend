import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTrendingThisWeek from './trendingThisWeek';
import * as fromHighRatedSeries from './highRatedSeries';
import * as fromRecentlyAdded from './recentlyAdded';
import * as fromMostPopularSeries from './mostPopularSeries';
import * as fromTrendingThisMonth from './trendingThisMonth';
import * as fromRoot from '../../reducers';

export interface BrowseState {
  trendingThisWeek: fromTrendingThisWeek.State;
  highRatedSeries: fromHighRatedSeries.State;
  recentlyAdded: fromRecentlyAdded.State;
  mostPopularSeries: fromMostPopularSeries.State;
  trendingThisMonth: fromTrendingThisMonth.State;
}

export interface State extends fromRoot.State {
  browse: BrowseState;
}

export const reducers = {
  trendingThisWeek: fromTrendingThisWeek.reducer,
  highRatedSeries: fromHighRatedSeries.reducer,
  recentlyAdded: fromRecentlyAdded.reducer,
  mostPopularSeries: fromMostPopularSeries.reducer,
  trendingThisMonth: fromTrendingThisMonth.reducer
};

export const getBrowseState = createFeatureSelector<BrowseState>('browse');

// TRENDING THIS WEEK
export const getTrendingThisWeekState = createSelector(getBrowseState, (state: BrowseState) => state.trendingThisWeek);

export const getTrendingThisWeekLoaded = createSelector(getTrendingThisWeekState, fromTrendingThisWeek.getLoaded);
export const getTrendingThisWeeknLoading = createSelector(getTrendingThisWeekState, fromTrendingThisWeek.getLoading);

export const getTrendingThisWeekSeries = createSelector(getTrendingThisWeekState, fromTrendingThisWeek.getSeries);

// HIGH RATED SERIES
export const getHighRatedSeriesState = createSelector(getBrowseState, (state: BrowseState) => state.highRatedSeries);

export const getHighRatedSeries = createSelector(getHighRatedSeriesState, fromHighRatedSeries.getSeries);

// RECENTLY ADDED
export const getRecentlyAddedState = createSelector(getBrowseState, (state: BrowseState) => state.recentlyAdded);

export const getRecentlyAddedSeries = createSelector(getRecentlyAddedState, fromRecentlyAdded.getSeries);

// MOST POPULAR
export const getMostPopularState = createSelector(getBrowseState, (state: BrowseState) => state.mostPopularSeries);

export const getMostPopularSeries = createSelector(getMostPopularState, fromMostPopularSeries.getSeries);

// TRENDING THIS MONTH
export const getTrendingThisMonthState = createSelector(
  getBrowseState,
  (state: BrowseState) => state.trendingThisMonth
);

export const getTrendingThisMonthSeries = createSelector(getTrendingThisMonthState, fromTrendingThisMonth.getSeries);
