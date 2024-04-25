import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/list/user.list.component';
import { AuthGuard } from './guard/permissions.service';
import { AppPaths } from './util/constants/app.paths';
import { StatusTypeListComponent } from './status.type/list/status.type.list.component';

const routes: Routes = [
  { path: AppPaths.HOME_PATH,   component: HomeComponent,     canActivate: [AuthGuard] },
  { path: AppPaths.LOGIN_PATH,  component: LoginComponent },
  { path: AppPaths.USERS_PATH,  component: UserListComponent, canActivate: [AuthGuard] },
  { path: AppPaths.STATUS_TYPES_PATH,  component: StatusTypeListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
