import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user.list/user.list.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }
