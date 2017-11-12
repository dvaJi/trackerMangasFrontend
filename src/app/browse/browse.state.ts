import Serie from './../models/serie';

export interface SerieState extends Serie {
    loading: boolean;
}

export const initializeListState = function () {
    return {
        loading: true,
    };
};

export interface BrowseState {
    trendingThisWeek: SerieState[];
    recentlyAdded: SerieState[];
    highRatedSeries: SerieState[];
    mostPopularSeries: SerieState[];
    trendingThisMonth: SerieState[];
    loading: boolean;
    error: boolean;
}

export const intializeBrowseListState = function () {
    return {
        loading: false,
        error: false,
    };
};
