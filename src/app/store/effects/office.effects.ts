import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { OfficeService } from '../../services/office.service';
import {
  LoadOfficesAction,
  LoadOfficesSuccessAction,
  LoadOfficesFailureAction,
  OfficeActionTypes,
  AddOfficeAction,
  AddOfficeSuccessAction,
  AddOfficeFailureAction,
  DeleteOfficeAction,
  DeleteOfficeSuccessAction,
  DeleteOfficeFailureAction,
  LoadSingleOfficeAction,
  LoadSingleOfficeSuccessAction,
} from '../actions/office.actions';
import { Office } from '../models/office.model';
@Injectable()
export class OfficeEffects {
  /**
   * Load all offices
   */
  @Effect() loadOffices$ = this.actions$.pipe(
    ofType<LoadOfficesAction>(OfficeActionTypes.LOAD_OFFICE),
    mergeMap(() =>
      this.officeService.getUserOffices().pipe(
        map((data) => {
          return new LoadOfficesSuccessAction(data);
        }),
        catchError((error) => of(new LoadOfficesFailureAction(error)))
      )
    )
  );

  /**
   * Load Single Office
   */
  @Effect() loadSingleOffice$ = this.actions$.pipe(
    ofType<LoadSingleOfficeAction>(OfficeActionTypes.LOAD_SINGLE_OFFICE),
    mergeMap((data) =>
      this.officeService.getOffice(data.payload.id).pipe(
        map((office: Office) => {
          return new LoadSingleOfficeSuccessAction(office.id);
        }),
        catchError((error) => of(new LoadOfficesFailureAction(error)))
      )
    )
  );

  /**
   * Add a new office
   */
  @Effect({ dispatch: false }) addOffice$ = this.actions$.pipe(
    ofType<AddOfficeAction>(OfficeActionTypes.ADD_OFFICE),
    mergeMap((data) =>
      this.officeService
        .addNewOffice(data.payload.id, data.payload)
        .then(() => {
          new AddOfficeSuccessAction(data.payload);
        })
        .catch((error) => of(new AddOfficeFailureAction(error)))
    )
  );

  /**
   * Delete Office
   */
  @Effect() deleteOffice$ = this.actions$.pipe(
    ofType<DeleteOfficeAction>(OfficeActionTypes.DELETE_OFFICE),
    mergeMap((data) =>
      this.officeService
        .deleteOffice(data.payload)
        .then(() => {
          new DeleteOfficeSuccessAction(data.payload);
        })
        .catch((error) => {
          new DeleteOfficeFailureAction(error);
        })
    )
  );

  constructor(
    private actions$: Actions,
    private officeService: OfficeService
  ) {}
}
