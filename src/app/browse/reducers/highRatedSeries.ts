import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Serie } from '@app/models';
import { HighRatedSeriesActions, HighRatedSeriesTypes } from '../actions/highRatedSeries';

export interface State {
  loaded: boolean;
  loading: boolean;
  series: Serie[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  series: []
};

export function reducer(state: any = initialState, action: HighRatedSeriesActions): State {
  switch (action.type) {
    case HighRatedSeriesTypes.GetHighRatedSeries: {
      return {
        ...state,
        loading: true
      };
    }

    case HighRatedSeriesTypes.GetHighRatedSeriesSuccess: {
      return {
        loaded: true,
        loading: false,
        series: [...action.payload]
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSeries = (state: State) => state.series;
