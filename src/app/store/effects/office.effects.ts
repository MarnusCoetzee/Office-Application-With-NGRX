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
} from '../actions/office.actions';
@Injectable()
export class OfficeEffects {
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

  constructor(
    private actions$: Actions,
    private officeService: OfficeService
  ) {}
}
