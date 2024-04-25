import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTypeListComponent } from './list/status.type.list.component';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    StatusTypeListComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    StatusTypeListComponent
  ]
})
export class StatusTypeModule { }
