import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from '../../_constants/app.paths';
import { DataServiceInterface } from '../../_services/data.service.interface';
import { MaterialModule } from 'src/material.module';
import { FormBuilderAndServiceProviderService } from '../../_services/form.builder.and.service.provider.service';

/**
 * Generic Popup Component for models:
 * Author, Publisher, Room, StatusType.
 */
@Component({
  selector: 'app-generic.popup',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './generic.popup.component.html',
  styleUrl: './generic.popup.component.css'
})
export class GenericPopupComponent implements OnInit {

  private editData: any;

  protected form!: FormGroup<any>;

  private service!: DataServiceInterface;

  protected model!: string;
  protected modelTitle!: string;
  private allowedRoles!: string[];

  constructor(
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<GenericPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private router: Router,
    private formServiceProvider: FormBuilderAndServiceProviderService
  ) {

    if (this.data.model != null) {
      let formServiceResponse = this.formServiceProvider.provideFormAndService(this.data.model);
      this.service = inject(formServiceResponse.service);
      this.form = formServiceResponse.form;
      this.model = this.data.model;
    } else {
      this.toastr.error('Unexpected error occured!');
    }
  }

  ngOnInit(): void {

    if (this.data.allowedRoles != null) {
      this.allowedRoles = this.data.allowedRoles;
    }

    if (!this.allowedRoles.includes(this.storage.getCurrentUserRole())) {
      this.refuseAccess();
    }

    if (this.data.id != null) {
      this.loadData(this.data.id);
      this.modelTitle = "Update " + this.model;
    }
    else {
      this.modelTitle = "Add " + this.model;
    }
  }

  private loadData(id: number): void {
    this.service.getEntityById(id).subscribe(res => {
      this.editData = res;
      this.form.setValue({
        id: this.editData.id,
        name: this.editData.name,
      });
    });
  }

  protected save(): void {
    if (this.data.id != null) {
      this.saveUpdated();
    } else {
      this.saveNew();
    }
  }

  private saveUpdated(): void {
    this.service.saveUpdatedEntity(this.editData.id, this.form.value).subscribe({
      next: () => {
        this.toastr.success('Updated successfully.');
        this.dialogRef.close();
      },
      error: (data) => {
        if (data.error) {
          data.error.errors.forEach((err: string) => {
            this.toastr.warning(err);
          });
        }
      }
    });
  }

  private saveNew(): void {
    this.service.saveEntity(this.form.value).subscribe({
      next: () => {
        this.toastr.success('User saved.');
        this.dialogRef.close();
      },
      error: (data) => {
        if (data.error) {
          data.error.errors.forEach((err: string) => {
            this.toastr.warning(err);
          });
        }
      }
    });
  }

  private refuseAccess(): void {
    this.toastr.error('You do not have access!', '', {
      positionClass: 'toast-top-center'
    });
    this.dialogRef.close();
    this.router.navigate([AppPaths.HOME_PATH]);
  }
}
