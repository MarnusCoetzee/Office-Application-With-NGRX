import { act } from '@ngrx/effects';
import { OfficeActionTypes, OfficeAction } from '../actions/office.actions';
import { Office } from '../models/office.model';
import { Staff } from '../models/staff.model';

export interface OfficesState {
  list: Office[];
  office: Office;
  loading: boolean;
  error: Error;
  staff: Staff[];
}

const initialState: OfficesState = {
  list: [],
  loading: false,
  error: undefined,
  office: {
    id: '',
    email: '',
    location: '',
    maxOfficeOccupants: 0,
    ownerId: '',
    name: '',
    tellNumber: '',
    totalEmployees: 0,
    officeColor: 'black',
  },
  staff: [],
};

export function OfficeReducer(
  state: OfficesState = initialState,
  action: OfficeAction
) {
  switch (action.type) {
    /**
     * LOAD OFFICES
     */
    // Load Office
    case OfficeActionTypes.LOAD_OFFICE:
      return {
        ...state,
        loading: true,
      };
    // Load Office Success
    case OfficeActionTypes.LOAD_OFFICE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    // Load Office Failure
    case OfficeActionTypes.LOAD_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    /**
     * LOAD SINGLE OFFICE
     */
    // Load Single Office
    case OfficeActionTypes.LOAD_SINGLE_OFFICE:
      return {
        ...state,
        loading: true,
      };
    // Load Single Office Success
    case OfficeActionTypes.LOAD_SINGLE_OFFICE_SUCCESS:
      return {
        ...state,
        office: action.payload,
        loading: false,
      };
    // Load Single Office Failure
    case OfficeActionTypes.LOAD_SINGLE_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // Add Office
    case OfficeActionTypes.ADD_OFFICE:
      return {
        ...state,
        loading: true,
      };
    // Add Office Success
    case OfficeActionTypes.ADD_OFFICE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    // Add Office Failure
    case OfficeActionTypes.ADD_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // Delete Office
    case OfficeActionTypes.DELETE_OFFICE:
      return {
        ...state,
        loading: true,
      };
    // Delete Office Success
    case OfficeActionTypes.DELETE_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    // Delete Office Failure
    case OfficeActionTypes.DELETE_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // Edit Office Action
    case OfficeActionTypes.EDIT_OFFICE:
      return {
        ...state,
        loading: true,
      };
    // Edit office Success Action
    case OfficeActionTypes.EDIT_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    // Edit Office Failure Action
    case OfficeActionTypes.EDIT_OFFICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
