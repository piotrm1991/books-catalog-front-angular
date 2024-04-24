import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from 'src/material.module';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    UserModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
