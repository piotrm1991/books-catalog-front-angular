import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map, EMPTY } from 'rxjs';
import { Room } from 'src/app/_models/room';
import { Shelf } from 'src/app/_models/shelf';
import { StorageService } from 'src/app/_services/storage.service';
import { RoomService } from 'src/app/room/room.service';
import { ShelfPopupComponent } from 'src/app/shelf/shelf.popup/shelf.popup.component';
import { ShelfService } from 'src/app/shelf/shelf.service';
import { Roles } from 'src/app/user/enums/roles';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { BookService } from '../book.service';
import { Author } from 'src/app/_models/author';
import { StatusType } from 'src/app/_models/status.type';
import { Publisher } from 'src/app/_models/publisher';
import { AuthorService } from 'src/app/author/author.service';
import { PublisherService } from 'src/app/publisher/publisher.service';
import { StatusTypeService } from 'src/app/status.type/status.type.service';

@Component({
  selector: 'app-book.popup',
  templateUrl: './book.popup.component.html',
  styleUrl: './book.popup.component.css'
})
export class BookPopupComponent implements OnInit {

  protected roomList?: Shelf[];

  private editData: any;

  protected form!: FormGroup<any>;

  protected formTitle!: string;

  protected filteredOptionsAuthor!: Observable<any[]>;
  protected filteredOptionsPublisher!: Observable<any[]>;
  protected filteredOptionsStatusType!: Observable<any[]>;
  protected filteredOptionsShelf!: Observable<any[]>;
  protected options!: any[];
  protected authorControl: FormControl = new FormControl();
  protected publisherControl: FormControl = new FormControl();
  protected statusTypeControl: FormControl = new FormControl();
  protected shelfControl: FormControl = new FormControl();

  constructor(
    private builder: FormBuilder,
    private serviceShelf: ShelfService,
    private serviceBook: BookService,
    private serviceAuthor: AuthorService,
    private servicePublisher: PublisherService,
    private serviceStatusType: StatusTypeService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<BookPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private router: Router
  ) {
    this.buildForm();

    this.filteredOptionsAuthor = this.authorControl
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterAuthors(val || '')
        })
      );

    this.filteredOptionsPublisher = this.publisherControl
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterPublishers(val || '')
        })
      );

    this.filteredOptionsStatusType = this.statusTypeControl
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterStatusTypes(val || '')
        })
      );

    this.filteredOptionsShelf = this.shelfControl
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterShelfs(val || '')
        })
      );
  }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.loadData(this.data.id);
      this.formTitle = "Update Book";
    } else {
      this.formTitle = "Add Book";
    }

    if (this.storage.getCurrentUserRole() != Roles.ADMIN_ROLE || this.storage.getCurrentUserRole() != Roles.ADMIN_ROLE) {
      this.toastr.error('You do not have access!', '', {
        positionClass: 'toast-top-center'
      });
      this.router.navigate([AppPaths.HOME_PATH]);
    }
  }

  loadData(id: any) {
    this.serviceBook.getEntityById(id).subscribe(res => {
      this.editData = res;
      this.form.setValue({
        id: this.editData.id,
        title: this.editData.title,
        author: this.editData.author,
        publisher: this.editData.publisher,
        statusType: this.editData.statusType,
        shelf: this.editData.shelf
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

  protected getAuthorName(author: Author): string | any {
    if (author != null) {
      return author.name;
    } else {
      return null;
    }
  }

  protected getPublisherName(publisher: Publisher): string | any {
    if (publisher != null) {
      return publisher.name;
    } else {
      return null;
    }
  }

  protected getStatusTypeName(statusType: StatusType): string | any {
    if (statusType != null) {
      return statusType.name;
    } else {
      return null;
    }
  }

  protected getShelfInfo(shelf: Shelf | any): string | any {
    if (shelf != null && shelf != '') {
      return shelf.room.name + ' - ' + shelf.letter + '/' + shelf.number;
    } else {
      return null;
    }
  }

  private buildEditForm(): void {
    this.form = this.builder.group({
      id: this.builder.control('', Validators.required),
      title: this.builder.control('', Validators.required),
      author: this.builder.control('', Validators.required),
      publisher: this.builder.control('', Validators.required),
      statusType: this.builder.control('', Validators.required),
      shelf: this.builder.control('', Validators.required)
    });
  }

  private buildAddForm(): void {
    this.form = this.builder.group({
      title: this.builder.control('', Validators.required),
      author: this.builder.control('', Validators.required),
      publisher: this.builder.control('', Validators.required),
      statusType: this.builder.control('', Validators.required),
      shelf: this.builder.control('', Validators.required)
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
    this.serviceBook.saveUpdatedEntity(id, this.prepareDataToSend()).subscribe({
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
      title: this.form.get('title')?.value,
      authorId: this.form.get('author')?.value.id,
      publisherId: this.form.get('publisher')?.value.id,
      shelfId: this.form.get('shelf')?.value.id,
      statusTypeId: this.form.get('statusType')?.value.id
    };
  }

  private saveNew(): void {
    this.serviceBook.saveEntity(this.prepareDataToSend()).subscribe({
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

  protected filterAuthors(val: any): Observable<any[]> {
    if (val.name) {
      val = val.name;
    }
    return this.serviceAuthor.getAll()
      .pipe(
        map(response => response.filter((option: Author) => {
          let test = option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
          return test;
        }))
      )
  }

  protected filterPublishers(val: any): Observable<any[]> {
    if (val.name) {
      val = val.name;
    }
    return this.servicePublisher.getAll()
      .pipe(
        map(response => response.filter((option: Publisher) => {
          let test = option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
          return test;
        }))
      )
  }

  protected filterStatusTypes(val: any): Observable<any[]> {
    if (val.name) {
      val = val.name;
    }
    return this.serviceStatusType.getAll()
      .pipe(
        map(response => response.filter((option: StatusType) => {
          let test = option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
          return test;
        }))
      )
  }

  protected filterShelfs(val: any): Observable<any[]> {
    if (typeof val != 'string') {
      return EMPTY;
    }
    return this.serviceShelf.getAll()
      .pipe(
        map(response => response.filter((option: Shelf) => {
          return option.room.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
        }))
      )
  }

  protected selectedAuthor(event: any): void {
    this.form.get('author')?.setValue(event.option.value);
  }

  protected selectedPublisher(event: any): void {
    this.form.get('publisher')?.setValue(event.option.value);
  }

  protected selectedStatusType(event: any): void {
    this.form.get('statusType')?.setValue(event.option.value);
  }

  protected selectedShelf(event: any): void {
    this.form.get('shelf')?.setValue(event.option.value);
  }
}
