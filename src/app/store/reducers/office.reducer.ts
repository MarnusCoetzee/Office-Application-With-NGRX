import { OfficeActionTypes, OfficeAction } from '../actions/office.actions';
import { Office } from '../models/office.model';

export interface OfficesState {
  list: Office[];
  loading: boolean;
  error: Error;
}

const initialState: OfficesState = {
  list: [],
  loading: false,
  error: undefined,
};

export function OfficeReducer(
  state: OfficesState = initialState,
  action: OfficeAction
) {
  switch (action.type) {
    case OfficeActionTypes.LOAD_OFFICE:
      return {
        ...state,
        loading: true,
      };
    case OfficeActionTypes.LOAD_OFFICE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case OfficeActionTypes.LOAD_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case OfficeActionTypes.ADD_OFFICE:
      return {
        ...state,
        loading: true,
      };
    case OfficeActionTypes.ADD_OFFICE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case OfficeActionTypes.ADD_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
