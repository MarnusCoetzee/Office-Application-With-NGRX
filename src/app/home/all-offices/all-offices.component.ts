import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Office } from '../../store/models/office.model';
import { AppState } from '../../store/models/app-state.model';
import { LoadOfficesAction } from '../../store/actions/office.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateNewOfficeDialogComponent } from '../dialogs/create-new-office-dialog/create-new-office-dialog.component';
import { DeleteOfficeDialogComponent } from '../dialogs/delete-office-dialog/delete-office-dialog.component';
import { Router } from '@angular/router';
import { EditOfficeDialogComponent } from '../dialogs/edit-office-dialog/edit-office-dialog.component';
@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss'],
})
export class AllOfficesComponent implements OnInit {
  offices: Observable<Array<Office>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initStoreFunctions();
  }

  private initStoreFunctions() {
    this.offices = this.store.select((store) => store.office.list);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.store.dispatch(new LoadOfficesAction());
  }

  /**
   * View Single Office
   * @param id
   */
  onClickNavigateOffice(id: string) {
    this.router.navigate(['offices/view-office', id]);
  }

  /**
   * Open Add New Office Dialog
   */
  onClickOpenAddOfficeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    this.dialog.open(CreateNewOfficeDialogComponent, dialogConfig);
  }

  onClickOpenEditOfficeDialog(id: string, office: Office) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = { id, office };
    this.dialog.open(EditOfficeDialogComponent, dialogConfig);
  }

  onClickOpenDeleteOfficeDialog(id: string, officeName: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      id,
      officeName,
    };
    this.dialog.open(DeleteOfficeDialogComponent, dialogConfig);
  }
}
