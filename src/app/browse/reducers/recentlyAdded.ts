import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Serie } from '@app/models';
import { RecentlyAddedActions, RecentlyAddedTypes } from '../actions/recentlyAdded';

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

export function reducer(state: any = initialState, action: RecentlyAddedActions): State {
  switch (action.type) {
    case RecentlyAddedTypes.GetRecentlyAdded: {
      return {
        ...state,
        loading: true
      };
    }

    case RecentlyAddedTypes.GetRecentlyAddedSuccess: {
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
