import { Action } from '@ngrx/store';
import { Staff } from '../models/staff.model';

export enum StaffActiontypes {
  // Load Staff
  LOAD_STAFF = '[STAFF] Load Staff',
  LOAD_STAFF_SUCCESS = '[STAFF] Load Staff Success',
  LOAD_STAFF_FAILURE = '[STAFF] Load Staff Failure',
  // Create Staff
  ADD_STAFF = '[STAFF] Add Staff',
  ADD_STAFF_SUCCESS = '[STAFF] Add Staff Success',
  ADD_STAFF_FAILURE = '[STAFF] Add Staff Failure',
  // Delete Staff
  DELETE_STAFF = '[STAFF] Delete Staff',
  DELETE_STAFF_SUCCESS = '[STAFF] Delete Staff Success',
  DELETE_STAFF_FAILURE = '[STAFF] Delete Staff Failure',
}

/**
 * LOADING Staff Actions
 */
export class LoadStaffAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF;
  constructor(public officeId: string) {}
}

export class LoadStaffSuccessAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF_SUCCESS;
  constructor(public payload: Array<Staff>) {}
}

export class LoadStaffFailureAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF_FAILURE;
  constructor(public error: Error) {}
}

export class AddStaffAction implements Action {
  readonly type = StaffActiontypes.ADD_STAFF;
  constructor(public payload: Staff, public officeId: string) {}
}

export class AddStaffSuccessAction implements Action {
  readonly type = StaffActiontypes.ADD_STAFF_SUCCESS;
  constructor() {}
}

export class AddStaffFailureAction implements Action {
  readonly type = StaffActiontypes.ADD_STAFF_FAILURE;
  constructor(public payload: Error) {}
}

export class DeleteStaffAction implements Action {
  readonly type = StaffActiontypes.DELETE_STAFF;
  constructor(public officeId: string, public employeeId: string) {}
}

export class DeleteStaffSuccessAction implements Action {
  readonly type = StaffActiontypes.DELETE_STAFF_SUCCESS;
  constructor() {}
}

export class DeleteStaffFailureAction implements Action {
  readonly type = StaffActiontypes.DELETE_STAFF_FAILURE;
  constructor(public error: Error) {}
}
export type StaffAction =
  | LoadStaffAction
  | LoadStaffSuccessAction
  | LoadStaffFailureAction
  | AddStaffAction
  | AddStaffSuccessAction
  | AddStaffFailureAction
  | DeleteStaffAction
  | DeleteStaffSuccessAction
  | DeleteStaffFailureAction;
