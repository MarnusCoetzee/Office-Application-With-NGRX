import { OfficesState } from '../reducers/office.reducer';
import { StaffState } from '../reducers/staff.reducer';
export interface AppState {
  readonly office: OfficesState;
  readonly staff: StaffState;
}
