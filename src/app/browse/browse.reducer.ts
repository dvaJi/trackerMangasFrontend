import { Serie } from '@app/models';
import { SerieMock } from '../../../testing/mock/serie-mock';
import { initializeListState, BrowseState, SerieState } from './browse.state';
import * as BrowseActions from './browse.action';

export type Action = BrowseActions.All;

const defaultTodoStates: SerieState[] = [
    { ...SerieMock.generateEmptyMockSerie(), ...initializeListState() },
    { ...SerieMock.generateEmptyMockSerie(), ...initializeListState() },
    { ...SerieMock.generateEmptyMockSerie(), ...initializeListState() },
    { ...SerieMock.generateEmptyMockSerie(), ...initializeListState() },
    { ...SerieMock.generateEmptyMockSerie(), ...initializeListState() }
];

const initialState: BrowseState = {
    trendingThisWeek: defaultTodoStates,
    recentlyAdded: defaultTodoStates,
    highRatedSeries: defaultTodoStates,
    mostPopularSeries: defaultTodoStates,
    trendingThisMonth: defaultTodoStates,
    loading: false,
    error: false
};

export function BrowseReducer(state: BrowseState = initialState, action: Action): BrowseState {

    switch (action.type) {
        case BrowseActions.GET_TRENDING_THIS_WEEK: {
            return { ...state, loading: true };
        }
        case BrowseActions.GET_TRENDING_THIS_WEEK_SUCCESS: {
            return {
                ...state,
                trendingThisWeek: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case BrowseActions.GET_TRENDING_THIS_WEEK_ERROR: {
            return {
                ...state,
                trendingThisWeek: [
                    ...state.trendingThisWeek
                ]
            };
        }
        case BrowseActions.GET_RECENTLY_ADDED: {
            return { ...state, loading: true };
        }
        case BrowseActions.GET_RECENTLY_ADDED_SUCCESS: {
            return {
                ...state,
                recentlyAdded: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case BrowseActions.GET_RECENTLY_ADDED_ERROR: {
            return {
                ...state,
                recentlyAdded: [
                    ...state.recentlyAdded
                ]
            };
        }
        case BrowseActions.GET_HIGH_RATED_SERIES: {
            return { ...state, loading: true };
        }
        case BrowseActions.GET_HIGH_RATED_SERIES_SUCCESS: {
            return {
                ...state,
                highRatedSeries: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case BrowseActions.GET_HIGH_RATED_SERIES_ERROR: {
            return {
                ...state,
                highRatedSeries: [
                    ...state.highRatedSeries
                ]
            };
        }
        case BrowseActions.GET_MOST_POPULAR_SERIES: {
            return { ...state, loading: true };
        }
        case BrowseActions.GET_MOST_POPULAR_SERIES_SUCCESS: {
            return {
                ...state,
                mostPopularSeries: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case BrowseActions.GET_MOST_POPULAR_SERIES_ERROR: {
            return {
                ...state,
                mostPopularSeries: [
                    ...state.mostPopularSeries
                ]
            };
        }
        case BrowseActions.GET_TRENDING_THIS_MONTH: {
            return { ...state, loading: true };
        }
        case BrowseActions.GET_TRENDING_THIS_MONTH_SUCCESS: {
            return {
                ...state,
                trendingThisMonth: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case BrowseActions.GET_TRENDING_THIS_MONTH_ERROR: {
            return {
                ...state,
                trendingThisMonth: [
                    ...state.trendingThisMonth
                ]
            };
        }
        default: {

            return state;
        }
    }
}
