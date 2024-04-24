import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user.list/user.list.component';
import { MaterialModule } from 'src/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserPopupComponent } from './popup/user.poup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    UserListComponent,
    UserPopupComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserListComponent,
    UserPopupComponent
  ]
})
export class UserModule { }
