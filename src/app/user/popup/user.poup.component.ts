import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from 'src/app/util/app.paths';
import { Roles } from 'src/app/util/roles';
import { UserService } from '../user.service';
import { Statuses } from 'src/app/util/statuses';

@Component({
  selector: 'user.popup.',
  templateUrl: './user.popup.component.html',
  styleUrl: './user.popup.component.css'
})
export class UserPopupComponent  implements OnInit, DoCheck {

  protected roleList?: Roles[];

  protected statusList?: Statuses[];

  private editData: any;

  protected updateForm!: FormGroup<any>;

  protected editFormFlag = false;

  protected hidePass = true;
  protected hidePassConf = true;

  constructor(
    private builder:    FormBuilder, 
    private service:    UserService, 
    private toastr:     ToastrService,
    private dialogRef:  MatDialogRef<UserPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private storage:    StorageService,
    private router:     Router
  ) {

    if (this.storage.getCurrentUserRole() != Roles.ADMIN_ROLE) {
      this.toastr.error('You do not have access!', '', {
        positionClass: 'toast-top-center'
      });
      this.router.navigate([AppPaths.HOME_PATH]);
    }
    this.buildRoleList();
    this.buildStatusList();
    this.buildForm();
  }

  ngDoCheck(): void {
    if (this.data.userId != null) {
      this.editFormFlag = true;
    }
  }

  ngOnInit(): void {
    if (this.data.userId != null) {
      this.loadUserData(this.data.userId);
    }
  }

  protected loadUserData(id: number): void {
    this.service.getUserById(id).subscribe(res => {
      this.editData = res;
      console.log(this.editData);
      this.updateForm.setValue({
        id:     this.editData.id,
        login:  this.editData.login,
        role:   this.editData.role, 
        status: this.editData.status
      });
    });
  }

  protected saveUser(): void {
    if (this.data.userId != null) {
      this.saveUpdatedUser();
    } else {
      this.saveNewUser();
    }
  }

  private saveNewUser(): void {
    this.service.saveNewdUser(this.updateForm.value).subscribe({
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

  private saveUpdatedUser(): void {
    this.service.saveUpdatedUser(this.editData.id, this.updateForm.value).subscribe({
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

  private buildForm(): void {
    if (this.data.userId != null) {
      this.buildEditForm();
    } else {
      this.buildAddForm();
    }
  }

  private buildEditForm(): void {
    this.updateForm = this.builder.group({
      id:   this.builder.control('', Validators.required),
      login:  this.builder.control('', [Validators.required, Validators.minLength(4)]),
      role:   this.builder.control('', Validators.required),
      status: this.builder.control('', Validators.required)
    });
  }

  private buildAddForm(): void {
    this.updateForm = this.builder.group({
      login:  this.builder.control('', [Validators.required, Validators.minLength(4)]),
      password:  this.builder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword:  this.builder.control('', [Validators.required, Validators.minLength(8)]),
      role:   this.builder.control('', Validators.required)
    });
  }

  private buildStatusList(): void {
    this.roleList = [
      Roles.ADMIN_ROLE,
      Roles.USER_ROLE
    ];
  }

  private buildRoleList(): void {
    this.statusList = [
      Statuses.ENABLED,
      Statuses.DISABLED
    ];
  }
}
