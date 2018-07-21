import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Serie, SerieChangelog } from '@app/models';
import { SerieDetailActions, SerieDetailActionTypes } from '../actions/serie-detail';

export interface State {
  loading: boolean;
  serie: Serie;
  changelog: SerieChangelog[];
}

const initialState: State = {
  loading: false,
  serie: null,
  changelog: []
};

export function reducer(state: any = initialState, action: SerieDetailActions): State {
  switch (action.type) {
    case SerieDetailActionTypes.GetSerie: {
      return {
        ...state,
        serie: null,
        loading: true
      };
    }

    case SerieDetailActionTypes.GetSerieSuccess: {
      return {
        loading: false,
        serie: action.payload,
        changelog: []
      };
    }

    case SerieDetailActionTypes.GetSerieHistory: {
      return {
        ...state,
      };
    }

    case SerieDetailActionTypes.GetSerieHistorySuccess: {
      return {
        ...state,
        changelog: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;

export const getSerie = (state: State) => state.serie;

export const getSerieChangelog = (state: State) => state.changelog;
