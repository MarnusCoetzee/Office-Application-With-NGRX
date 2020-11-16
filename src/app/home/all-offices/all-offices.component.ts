import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Office } from '../../store/models/office.model';
import { AppState } from '../../store/models/app-state.model';
import { LoadOfficesAction } from '../../store/actions/office.actions';
@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss'],
})
export class AllOfficesComponent implements OnInit {
  offices: Observable<Array<Office>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initStoreFunctions();
  }

  private initStoreFunctions() {
    this.offices = this.store.select((store) => store.office.list);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.store.dispatch(new LoadOfficesAction());
  }

  onClickNavigateOffice(id: string) {}

  onClickOpenEditOfficeDialog(id: string) {}

  onClickOpenDeleteOfficeDialog(id: string, officeName: string) {}

  onClickOpenAddOfficeDialog() {}
}
