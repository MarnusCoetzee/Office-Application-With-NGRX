import { StaffActiontypes, StaffAction } from '../actions/staff.actions';
import { Staff } from '../models/staff.model';

export interface StaffState {
  staffMembers: [];
  staff: Staff;
  loading: boolean;
  error: Error;
}

const initialState: StaffState = {
  staffMembers: [],
  staff: {
    firstName: '',
    lastName: '',
    employeeId: '',
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
        staffMembers: action.payload,
        loading: false,
      };
    case StaffActiontypes.LOAD_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
  }
}
