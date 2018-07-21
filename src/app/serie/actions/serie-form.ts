import { Action } from '@ngrx/store';
import { Serie, Genre, Demographic } from '@app/models';

export enum FormActionTypes {
  Submit = '[Serie Form] Submit',
  SubmitSuccess = '[Serie Form] Submit Success',
  SubmitFailure = '[Serie Form] Submit Failure',
  SubmitGetSerie = '[Serie Form] Submit Get Serie',
  SubmitGetSerieSuccess = '[Serie Form] Submit Get Serie Success',
  SubmitGetSerieFailure = '[Serie Form] Submit Get Serie Failure',
  GetGenres = '[Serie Form] Get Genres',
  GetGenresSuccess = '[Serie Form] Get Genres Success',
  GetGenresFailure = '[Serie Form] Get Genres Failure',
  GetDemographics = '[Serie Form] Get Demographics',
  GetDemographicsSuccess = '[Serie Form] Get Demographics Success',
  GetDemographicsFailure = '[Serie Form] Get Demographics Failure'
}

export class Submit implements Action {
  readonly type = FormActionTypes.Submit;

  constructor(public payload: Serie) {}
}

export class SubmitSuccess implements Action {
  readonly type = FormActionTypes.SubmitSuccess;

  constructor(public payload: any) {}
}

export class SubmitFailure implements Action {
  readonly type = FormActionTypes.SubmitFailure;

  constructor(public payload: any) {}
}

export class SubmitGetSerie implements Action {
  readonly type = FormActionTypes.SubmitGetSerie;

  constructor(public payload: number) {}
}

export class SubmitGetSerieSuccess implements Action {
  readonly type = FormActionTypes.SubmitGetSerieSuccess;

  constructor(public payload: Serie) {}
}

export class SubmitGetSerieFailure implements Action {
  readonly type = FormActionTypes.SubmitGetSerieFailure;

  constructor(public payload: any) {}
}

export class GetGenres implements Action {
  readonly type = FormActionTypes.GetGenres;

  constructor(public payload: number) {}
}

export class GetGenresSuccess implements Action {
  readonly type = FormActionTypes.GetGenresSuccess;

  constructor(public payload: Genre[]) {}
}

export class GetGenresFailure implements Action {
  readonly type = FormActionTypes.GetGenresFailure;

  constructor(public payload: any) {}
}

export class GetDemographics implements Action {
  readonly type = FormActionTypes.GetDemographics;
}

export class GetDemographicsSuccess implements Action {
  readonly type = FormActionTypes.GetDemographicsSuccess;

  constructor(public payload: Demographic[]) {}
}

export class GetDemographicsFailure implements Action {
  readonly type = FormActionTypes.GetDemographicsFailure;

  constructor(public payload: any) {}
}

export type FormActions =
  | Submit
  | SubmitSuccess
  | SubmitFailure
  | SubmitGetSerie
  | SubmitGetSerieSuccess
  | SubmitGetSerieFailure
  | GetGenres
  | GetGenresSuccess
  | GetGenresFailure
  | GetDemographics
  | GetDemographicsSuccess
  | GetDemographicsFailure;
