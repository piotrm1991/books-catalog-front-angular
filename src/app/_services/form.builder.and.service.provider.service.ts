import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelList } from '../_constants/model.list';
import { ToastrService } from 'ngx-toastr';
import { StatusTypeService } from '../status.type/status.type.service';
import { AuthorService } from '../author/author.service';
import { PublisherService } from '../publisher/publisher.service';
import { RoomService } from '../room/room.service';

/**
 * Service that builds form and provides api service based on given model name 
 * from ModelList const.
 */
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
      case ModelList.STATUS_TYPE: {

        return StatusTypeService;
      }
      case ModelList.AUTHOR: {

        return AuthorService;
      }
      case ModelList.PUBLISHER: {

        return PublisherService;
      }
      case ModelList.ROOM: {

        return RoomService;
      }
      default:{
        this.toastr.error('Unexpected error occured!');
        return null;
      }
    }
  }

  private buildForm(modelName: string): FormGroup | null {

    switch(modelName) {
      case ModelList.STATUS_TYPE: {

        return this.buildFormStatusType();
      }
      case ModelList.AUTHOR: {

        return this.buildFormAuthor();
      }
      case ModelList.PUBLISHER: {

        return this.buildFormPublisher();
      }
      case ModelList.ROOM: {

        return this.buildFormRoom();
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

  private buildFormRoom(): FormGroup {

    return this.builder.group({
      id:   this.builder.control('', Validators.required),
      name:  this.builder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  private buildFormAuthor(): FormGroup {

    return this.builder.group({
      id:   this.builder.control('', Validators.required),
      name:  this.builder.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  private buildFormPublisher(): FormGroup {

    return this.builder.group({
      id:   this.builder.control('', Validators.required),
      name:  this.builder.control('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
