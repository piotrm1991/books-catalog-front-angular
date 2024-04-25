import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Models } from './constants/model';
import { ToastrService } from 'ngx-toastr';
import { StatusTypeService } from '../status.type/status.type.service';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderAndServiceProviderService {

  constructor(
    private builder:    FormBuilder,
    private toastr:     ToastrService
  ) {}

  public provideFormAndService(modelName: string): any {

    return {
      service:  this.getService(modelName),
      form:     this.buildForm(modelName)
    };
  }

  private getService(modelName: string): any {

    switch(modelName) {
      case Models.STATUS_TYPE: {

        return StatusTypeService;
      }
      default:{
        this.toastr.error('Unexpected error occured!');
        return null;
      }
    }
  }

  private buildForm(modelName: string): FormGroup | null {

    switch(modelName) {
      case Models.STATUS_TYPE: {

        return this.buildFormStatusType();
      }
      default:{
        this.toastr.error('Unexpected error occured!');
        return null;
      }
    }
  }

  private buildFormStatusType(): FormGroup {

    return this.builder.group({
      id:   this.builder.control('', Validators.required),
      name:  this.builder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }
}
