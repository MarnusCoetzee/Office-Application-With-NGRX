import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OfficeService } from '../../services/office.service';
import {
  LoadOfficesAction,
  LoadOfficesSuccessAction,
  LoadOfficesFailureAction,
  OfficeActionTypes,
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

  constructor(
    private actions$: Actions,
    private officeService: OfficeService
  ) {}
}
