import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficeDialogComponent } from './edit-office-dialog.component';

describe('EditOfficeDialogComponent', () => {
  let component: EditOfficeDialogComponent;
  let fixture: ComponentFixture<EditOfficeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfficeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfficeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
