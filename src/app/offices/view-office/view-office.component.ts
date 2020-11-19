import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadSingleOfficeAction } from 'src/app/store/actions/office.actions';
import { LoadStaffAction } from 'src/app/store/actions/staff.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';
import { Staff } from '../../store/models/staff.model';
import { CreateEmployeeDialogComponent } from '../dialogs/create-employee-dialog/create-employee-dialog.component';
import { DeleteEmployeeDialogComponent } from '../dialogs/delete-employee-dialog/delete-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../dialogs/edit-employee-dialog/edit-employee-dialog.component';
@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.scss'],
})
export class ViewOfficeComponent implements OnInit {
  office$: Observable<Office>;
  staff$: Observable<Array<Staff>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  staffLoading$: Observable<boolean>;
  staffError$: Observable<Error>;

  officeId: string;

  searchForm: FormGroup;
  showFiltered: boolean = false;
  filteredEmployees: Array<Staff>;
  employees: Array<Staff>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.officeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadSingleOffice(this.officeId);
    this.initSearchForm();
    this.loadStaff(this.officeId);
    this.onChanges();
    this.staff$.subscribe((staffResult: Array<Staff>) => {
      this.employees = staffResult;
    });
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

  private loadStaff(id: string) {
    this.staffLoading$ = this.store.select((store) => store.staff.loading);
    this.staff$ = this.store.select((store) => store.staff.list);
    this.staffError$ = this.store.select((store) => store.staff.error);
    this.store.dispatch(new LoadStaffAction(id));
  }

  onClickNavigateBack() {
    this.router.navigate(['home']);
  }

  onClickOpenAddNewStaffMemberDialog(officeId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      officeId,
    };
    this.dialog.open(CreateEmployeeDialogComponent, dialogConfig);
  }

  onClickOpenDeleteStaffDialog(staff: Staff) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = { staff };
    this.dialog.open(DeleteEmployeeDialogComponent, dialogConfig);
  }

  onClickOpenEditStaffDialog(staff: Staff) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = { staff };
    this.dialog.open(EditEmployeeDialogComponent, dialogConfig);
  }
}
