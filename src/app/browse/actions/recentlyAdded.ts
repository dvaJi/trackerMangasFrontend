import { Serie } from '@app/models';
import { Action } from '@ngrx/store';

export enum RecentlyAddedTypes {
    GetRecentlyAdded = '[Browse] Get Recently Added',
    GetRecentlyAddedSuccess = '[Browse] Get Recently Added Success',
    GetRecentlyAddedError = '[Browse] Get Recently Added Error',
}

// RECENTLY ADDED
export class GetRecentlyAdded implements Action {
    readonly type = RecentlyAddedTypes.GetRecentlyAdded;
}

export class GetRecentlyAddedSuccess implements Action {
    readonly type = RecentlyAddedTypes.GetRecentlyAddedSuccess;

    constructor(public payload: Serie[]) { }
}

export class GetRecentlyAddedError implements Action {
    readonly type = RecentlyAddedTypes.GetRecentlyAddedError;
}

export type RecentlyAddedActions = GetRecentlyAdded | GetRecentlyAddedSuccess | GetRecentlyAddedError;
