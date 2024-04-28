import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { BookListComponent } from './list/book.list.component';
import { BookPopupComponent } from './popup/book.popup.component';



@NgModule({
  declarations: [
    BookListComponent,
    BookPopupComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    BookListComponent,
    BookPopupComponent
  ]
})
export class BookModule { }
