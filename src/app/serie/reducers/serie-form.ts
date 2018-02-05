import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Serie, Demographic, Genre } from '@app/models';
import { FormActions, FormActionTypes } from '../actions/serie-form';

export interface State {
  loading: boolean;
  serie: Serie;
  genres: Genre[];
  demographics: Demographic[];
}

const initialState: State = {
  loading: false,
  serie: null,
  genres: [],
  demographics: []
};

export function reducer(state: any = initialState, action: FormActions): State {
  switch (action.type) {
    case FormActionTypes.Submit: {
      return {
        ...state,
        loading: true
      };
    }

    case FormActionTypes.SubmitSuccess: {
      return {
        ...state,
        loading: false,
        serie: action.payload
      };
    }

    case FormActionTypes.SubmitGetSerie: {
      return {
        ...state,
        loading: true
      };
    }

    case FormActionTypes.SubmitGetSerieSuccess: {
      return {
        ...state,
        loading: false,
        serie: action.payload
      };
    }

    case FormActionTypes.GetGenres: {
      return {
        ...state,
        loading: true
      };
    }

    case FormActionTypes.GetGenresSuccess: {
      return {
        ...state,
        loading: false,
        genres: action.payload
      };
    }

    case FormActionTypes.GetDemographics: {
      return {
        ...state,
        loading: true
      };
    }

    case FormActionTypes.GetDemographicsSuccess: {
      return {
        ...state,
        loading: false,
        demographics: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;

export const getSerie = (state: State) => state.serie;

export const getGenres = (state: State) => state.genres;

export const getDemographics = (state: State) => state.demographics;
