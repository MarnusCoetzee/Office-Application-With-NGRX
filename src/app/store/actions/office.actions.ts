import { Action } from '@ngrx/store';
import { Office } from '../models/office.model';

export enum OfficeActionTypes {
  LOAD_OFFICE = '[OFFICE] Load Office',
  LOAD_OFFICE_SUCCESS = '[OFFICE] Load Office Success',
  LOAD_OFFICE_FAILURE = '[OFFICE] Load Office Failure',
  ADD_OFFICE = '[Office] Add Office',
  ADD_OFFICE_SUCCESS = '[Office] Add Office Success',
  ADD_OFFICE_FAILURE = '[Office] Add Office Failure',
}

/**
 * Loading office Actions
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

/**
 * Adding Office Actions
 */
export class AddOfficeAction implements Action {
  readonly type = OfficeActionTypes.ADD_OFFICE;
  constructor(public payload: Office) {}
}

export class AddOfficeSuccessAction implements Action {
  readonly type = OfficeActionTypes.ADD_OFFICE_SUCCESS;
  constructor(public payload: Office) {}
}

export class AddOfficeFailureAction implements Action {
  readonly type = OfficeActionTypes.ADD_OFFICE_FAILURE;
  constructor(public payload: Error) {}
}

export type OfficeAction =
  | LoadOfficesAction
  | LoadOfficesSuccessAction
  | LoadOfficesFailureAction
  | AddOfficeAction
  | AddOfficeSuccessAction
  | AddOfficeFailureAction;
