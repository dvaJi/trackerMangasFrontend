import { Serie, SerieChangelog } from '@app/models';
import { Action } from '@ngrx/store';

export enum SerieDetailActionTypes {
  GetSerie = '[Serie Detail] Get Serie',
  GetSerieSuccess = '[Serie Detail] Get Serie Success',
  GetSerieError = '[Serie Detail] Get Serie Error',
  GetSerieHistory = '[Serie Detail] Get Serie History',
  GetSerieHistorySuccess = '[Serie Detail] Get Serie History Success',
  GetSerieHistoryError = '[Serie Detail] Get Serie History Error'
}

export class GetSerie implements Action {
  readonly type = SerieDetailActionTypes.GetSerie;

  constructor(public payload: number) {}
}

export class GetSerieSuccess implements Action {
  readonly type = SerieDetailActionTypes.GetSerieSuccess;

  constructor(public payload: Serie) {}
}

export class GetSerieError implements Action {
  readonly type = SerieDetailActionTypes.GetSerieError;
}

export class GetSerieHistory implements Action {
  readonly type = SerieDetailActionTypes.GetSerieHistory;

  constructor(public payload: number) {}
}

export class GetSerieHistorySuccess implements Action {
  readonly type = SerieDetailActionTypes.GetSerieHistorySuccess;

  constructor(public payload: SerieChangelog[]) {}
}

export class GetSerieHistoryError implements Action {
  readonly type = SerieDetailActionTypes.GetSerieHistoryError;
}

export type SerieDetailActions =
  | GetSerie
  | GetSerieSuccess
  | GetSerieError
  | GetSerieHistory
  | GetSerieHistorySuccess
  | GetSerieHistoryError;
