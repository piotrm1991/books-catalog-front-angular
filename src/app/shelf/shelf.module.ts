import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ShelfListComponent } from './shelf.list/shelf.list.component';
import { ShelfPopupComponent } from './shelf.popup/shelf.popup.component';



@NgModule({
  declarations: [
    ShelfListComponent,
    ShelfPopupComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    ShelfListComponent,
    ShelfPopupComponent
  ]
})
export class ShelfModule { }
