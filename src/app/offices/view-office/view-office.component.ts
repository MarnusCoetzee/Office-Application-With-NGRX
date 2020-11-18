import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadSingleOfficeAction } from 'src/app/store/actions/office.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';
import { Staff } from '../../store/models/staff.model';
@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.scss'],
})
export class ViewOfficeComponent implements OnInit {
  office$: Observable<Office>;
  employees$: Observable<Array<Staff>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  officeId: string;

  searchForm: FormGroup;
  showFiltered: boolean = false;
  filteredEmployees: Array<Staff>;
  employees: Array<Staff>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.officeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initSearchForm();
    this.loadSingleOffice(this.officeId);
  }

  private initSearchForm() {
    // form used for search input box
    this.searchForm = this.fb.group({
      searchString: '',
    });
  }

  /**
   * Function that filteres through employee names and shows result
   */
  onChanges(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      // show different array results in html, use showFiltered with ngIf to switch between arrays
      // show filtered array if a search input has been detected
      if (value.searchString.length > 0) {
        // show filtered names
        this.showFiltered = true;
      }
      // show original array if the search input is cancelled
      if (value.searchString.length === 0) {
        // show unfiltered names
        this.showFiltered = false;
      }
      // filter employees array and return filtered employees
      this.filteredEmployees = this.employees.filter((searchedEmployee) => {
        const employeeName =
          searchedEmployee.firstName + ' ' + searchedEmployee.lastName;
        return employeeName
          .toLowerCase()
          .includes(value.searchString.toLowerCase());
      });
    });
  }

  private loadSingleOffice(id: string) {
    this.office$ = this.store.select((store) => store.office.office);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.store.dispatch(new LoadSingleOfficeAction(id));
  }

  onClickNavigateBack() {
    this.router.navigate(['home']);
  }
}
