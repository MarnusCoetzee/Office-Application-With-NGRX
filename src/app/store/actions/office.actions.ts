import { Action } from '@ngrx/store';
import { Office } from '../models/office.model';

export enum OfficeActionTypes {
  LOAD_OFFICE = '[OFFICE] Load Office',
  LOAD_OFFICE_SUCCESS = '[OFFICE] Load Office Success',
  LOAD_OFFICE_FAILURE = '[OFFICE] Load Office Failure',
}

/**
 * Loading Actions
 */
export class LoadOfficesAction implements Action {
  readonly type = OfficeActionTypes.LOAD_OFFICE;
}

export class LoadOfficesSuccessAction implements Action {
  readonly type = OfficeActionTypes.LOAD_OFFICE_SUCCESS;
  constructor(public payload: Array<Office>) {}
}

export class LoadOfficesFailureAction implements Action {
  readonly type = OfficeActionTypes.LOAD_OFFICE_FAILURE;
  constructor(public payload: Error) {}
}

export type OfficeAction =
  | LoadOfficesAction
  | LoadOfficesSuccessAction
  | LoadOfficesFailureAction;
