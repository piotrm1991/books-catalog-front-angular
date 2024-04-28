import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/_models/room';
import { ShelfService } from '../shelf.service';
import { RoomService } from 'src/app/room/room.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from 'src/app/_constants/app.paths';
import { Roles } from 'src/app/user/enums/roles';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-shelf.popup',
  templateUrl: './shelf.popup.component.html',
  styleUrl: './shelf.popup.component.css'
})
export class ShelfPopupComponent implements OnInit {

  protected roomList?: Room[];

  private editData: any;

  protected form!: FormGroup<any>;

  protected formTitle!: string;

  protected filteredOptions!: Observable<any[]>;
  protected options!: Room[];
  protected roomControl: FormControl = new FormControl();

  constructor(
    private builder: FormBuilder,
    private serviceShelf: ShelfService,
    private serviceRoom: RoomService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ShelfPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private router: Router
  ) {
    this.buildForm();

    this.filteredOptions = this.roomControl
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '')
        })
      );
  }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.loadShelfData(this.data.id);
      this.formTitle = "Update Shelf";
    } else {
      this.formTitle = "Add Shelf";
    }

    if (this.storage.getCurrentUserRole() != Roles.ADMIN_ROLE || this.storage.getCurrentUserRole() != Roles.ADMIN_ROLE) {
      this.toastr.error('You do not have access!', '', {
        positionClass: 'toast-top-center'
      });
      this.router.navigate([AppPaths.HOME_PATH]);
    }
  }

  loadShelfData(id: any) {
    this.serviceShelf.getEntityById(id).subscribe(res => {
      this.editData = res;
      this.form.setValue({
        id: this.editData.id,
        letter: this.editData.letter,
        number: this.editData.number,
        room: this.editData.room
      });
    });
  }

  private buildForm(): void {
    if (this.data.id != null) {
      this.buildEditForm();
    } else {
      this.buildAddForm();
    }
  }

  protected getRoomName(room: Room): string | any {
    if (room != null) {
      return room.name;
    } else {
      return null;
    }
  }

  private buildEditForm(): void {
    this.form = this.builder.group({
      id: this.builder.control('', Validators.required),
      letter: this.builder.control('', Validators.required),
      number: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      room: this.builder.control('', Validators.required)
    });
  }

  private buildAddForm(): void {
    this.form = this.builder.group({
      letter: this.builder.control('', Validators.required),
      number: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      room: this.builder.control('', Validators.required)
    });
  }

  protected save(): void {
    if (this.data.id != null) {
      this.saveUpdated(this.data.id);
    } else {
      this.saveNew();
    }
  }

  private saveUpdated(id: number): void {
    this.serviceShelf.saveUpdatedEntity(id, this.prepareDataToSend()).subscribe({
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

  private prepareDataToSend(): any {
    return {
      letter: this.form.get('letter')?.value,
      number: this.form.get('number')?.value,
      idRoom: this.form.get('room')?.value.id
    };
  }

  private saveNew(): void {
    this.serviceShelf.saveEntity(this.prepareDataToSend()).subscribe({
      next: () => {
        this.toastr.success('Saved successfully.');
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

  protected filter(val: any): Observable<any[]> {
    if (val.name) {
      val = val.name;
    }
    return this.serviceRoom.getAll()
      .pipe(
        map(response => response.filter((option: Room) => {
          let test =  option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
          return test;
        }))
      )
  }

  protected selectedRoom(event: any): void {
    this.form.get('room')?.setValue(event.option.value);
  }
}

