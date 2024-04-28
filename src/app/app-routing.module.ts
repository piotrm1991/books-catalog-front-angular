import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/list/user.list.component';
import { AuthGuard } from './_guard/permissions.service';
import { AppPaths } from './_constants/app.paths';
import { StatusTypeListComponent } from './status.type/list/status.type.list.component';
import { AuthorListComponent } from './author/list/author.list.component';
import { PublisherListComponent } from './publisher/list/publisher.list.component';
import { RoomListComponent } from './room/list/room.list.component';
import { ShelfListComponent } from './shelf/list/shelf.list.component';
import { BookListComponent } from './book/list/book.list.component';

const routes: Routes = [
  { path: AppPaths.HOME_PATH, component: HomeComponent, canActivate: [AuthGuard] },
  { path: AppPaths.LOGIN_PATH, component: LoginComponent },
  { path: AppPaths.USERS_PATH, component: UserListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.STATUS_TYPES_PATH, component: StatusTypeListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.AUTHORS_PATH, component: AuthorListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.PUBLISHERS_PATH, component: PublisherListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.ROOMS_PATH, component: RoomListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.SHELVES_PATH, component: ShelfListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.BOOKS_PATH, component: BookListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
