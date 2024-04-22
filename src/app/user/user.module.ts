import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user.list/user.list.component';
import { MaterialModule } from 'src/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }
