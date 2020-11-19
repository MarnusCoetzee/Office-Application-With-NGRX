import { Action } from '@ngrx/store';
import { Office } from '../models/office.model';
import { Staff } from '../models/staff.model';

export enum OfficeActionTypes {
  // load offices
  LOAD_OFFICE = '[OFFICE] Load Office',
  LOAD_OFFICE_SUCCESS = '[OFFICE] Load Office Success',
  LOAD_OFFICE_FAILURE = '[OFFICE] Load Office Failure',
  // Load Single Office
  LOAD_SINGLE_OFFICE = '[OFFICE] Load Single Office',
  LOAD_SINGLE_OFFICE_SUCCESS = '[OFFICE] Load Single Office Success',
  LOAD_SINGLE_OFFICE_FAILURE = '[OFFICE] Load Single Office Failure',
  // add office
  ADD_OFFICE = '[OFFICE] Add Office',
  ADD_OFFICE_SUCCESS = '[OFFICE] Add Office Success',
  ADD_OFFICE_FAILURE = '[OFFICE] Add Office Failure',
  // delete office
  DELETE_OFFICE = '[OFFICE] Delete Office',
  DELETE_OFFICE_SUCCESS = '[OFFICE] Delete Office Success',
  DELETE_OFFICE_FAILURE = '[OFFICE] Delete Office Failure',
  // Edit Office
  EDIT_OFFICE = '[OFFICE] Edit Office',
  EDIT_OFFICE_SUCCESS = '[OFFICE] Edit Office Success',
  EDIT_OFFICE_FAILURE = '[OFFICE] Edit Office Failure',
  // Load Office Employees
  LOAD_OFFICE_STAFF = '[OFFICE] Load Staff',
  LOAD_OFFICE_STAFF_SUCCESS = '[OFFICE] Load Staff Success',
  LOAD_OFFICE_STAFF_FAILURE = '[OFFICE] Load Staff Failure',
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
 * Load single office actions
 */
export class LoadSingleOfficeAction implements Action {
  readonly type = OfficeActionTypes.LOAD_SINGLE_OFFICE;
  constructor(public officeId: string) {}
}

export class LoadSingleOfficeSuccessAction implements Action {
  readonly type = OfficeActionTypes.LOAD_SINGLE_OFFICE_SUCCESS;
  constructor(public payload: Office) {}
}

export class LoadSingleOfficeFailureAction implements Action {
  readonly type = OfficeActionTypes.LOAD_SINGLE_OFFICE_FAILURE;
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

/**
 * Delete Office Actions
 */
export class DeleteOfficeAction implements Action {
  readonly type = OfficeActionTypes.DELETE_OFFICE;
  constructor(public officeId: string) {}
}

export class DeleteOfficeSuccessAction implements Action {
  readonly type = OfficeActionTypes.DELETE_OFFICE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteOfficeFailureAction implements Action {
  readonly type = OfficeActionTypes.DELETE_OFFICE_FAILURE;
  constructor(public payload: string) {}
}

/**
 * Edit Office Actions
 */
export class EditOfficeAction implements Action {
  readonly type = OfficeActionTypes.EDIT_OFFICE;
  constructor(public payload: Office) {}
}

export class EditOfficeSuccessAction implements Action {
  readonly type = OfficeActionTypes.EDIT_OFFICE_SUCCESS;
}

export class EditOfficeFailureAction implements Action {
  readonly type = OfficeActionTypes.EDIT_OFFICE_FAILURE;
  constructor(public payload: Error) {}
}

export type OfficeAction =
  | LoadOfficesAction
  | LoadOfficesSuccessAction
  | LoadOfficesFailureAction
  | AddOfficeAction
  | AddOfficeSuccessAction
  | AddOfficeFailureAction
  | DeleteOfficeAction
  | DeleteOfficeSuccessAction
  | DeleteOfficeFailureAction
  | LoadSingleOfficeAction
  | LoadSingleOfficeSuccessAction
  | LoadSingleOfficeFailureAction
  | EditOfficeAction
  | EditOfficeSuccessAction
  | EditOfficeFailureAction;
