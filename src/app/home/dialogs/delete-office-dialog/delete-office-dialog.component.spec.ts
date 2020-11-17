import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOfficeDialogComponent } from './delete-office-dialog.component';

describe('DeleteOfficeDialogComponent', () => {
  let component: DeleteOfficeDialogComponent;
  let fixture: ComponentFixture<DeleteOfficeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOfficeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOfficeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
