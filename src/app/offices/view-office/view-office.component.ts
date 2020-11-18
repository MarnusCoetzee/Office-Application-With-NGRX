import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadSingleOfficeAction } from 'src/app/store/actions/office.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';

@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.scss'],
})
export class ViewOfficeComponent implements OnInit {
  office$: Observable<Office>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  officeId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.officeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadSingleOffice(this.officeId);
  }

  private loadSingleOffice(id: string) {
    this.office$ = this.store.select((store) => store.office.office);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.store.dispatch(new LoadSingleOfficeAction(id));
  }

  onClickNavigateBack() {}
}
