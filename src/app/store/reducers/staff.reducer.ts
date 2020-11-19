import { StaffActiontypes, StaffAction } from '../actions/staff.actions';
import { Staff } from '../models/staff.model';

export interface StaffState {
  list: Staff[];
  staff: Staff;
  loading: boolean;
  error: Error;
}

const initialState: StaffState = {
  list: [],
  staff: {
    firstName: '',
    lastName: '',
    employeeId: '',
    officeId: '',
  },
  loading: false,
  error: undefined,
};

export function StaffReducer(
  state: StaffState = initialState,
  action: StaffAction
) {
  switch (action.type) {
    /**
     * LOAD STAFF
     */
    case StaffActiontypes.LOAD_STAFF:
      return {
        ...state,
        loading: true,
      };
    case StaffActiontypes.LOAD_STAFF_SUCCESS:
      return {
        ...state,
        list: [...action.payload],
        loading: false,
      };
    case StaffActiontypes.LOAD_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case StaffActiontypes.ADD_STAFF:
      return {
        ...state,
        loading: true,
      };
    case StaffActiontypes.ADD_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StaffActiontypes.ADD_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case StaffActiontypes.DELETE_STAFF:
      return {
        ...state,
        loading: true,
      };
    case StaffActiontypes.DELETE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StaffActiontypes.DELETE_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case StaffActiontypes.EDIT_STAFF:
      return {
        ...state,
        loading: true,
      };
    case StaffActiontypes.EDIT_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StaffActiontypes.DELETE_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
