import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSerieDetail from './serie-detail';
import * as fromSerieForm from './serie-form';
import * as fromRoot from '../../reducers';

export interface SerieState {
  serieDetail: fromSerieDetail.State;
  form: fromSerieForm.State;
}

export interface State extends fromRoot.State {
  series: SerieState;
}

export const reducers = {
  serieDetail: fromSerieDetail.reducer,
  form: fromSerieForm.reducer
};

export const getSerieState = createFeatureSelector<SerieState>('series');

// DETAIL
export const getSerieDetailState = createSelector(getSerieState, (state: SerieState) => state.serieDetail);
export const getSerieDetailLoading = createSelector(getSerieDetailState, fromSerieDetail.getLoading);
export const getSerieDetail = createSelector(getSerieDetailState, fromSerieDetail.getSerie);
export const getSerieChangelog = createSelector(getSerieDetailState, fromSerieDetail.getSerieChangelog);

// FORM
export const getSerieFormState = createSelector(getSerieState, (state: SerieState) => state.form);
export const getGenres = createSelector(getSerieFormState, fromSerieForm.getGenres);
export const getDemographics = createSelector(getSerieFormState, fromSerieForm.getDemographics);
export const getFormSerie = createSelector(getSerieFormState, fromSerieForm.getSerie);
