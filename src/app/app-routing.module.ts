import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/user.list/user.list.component';
import { AuthGuard } from './guard/permissions.service';
import { AppPaths } from './util/app.paths';

const routes: Routes = [
  { path: AppPaths.HOME_PATH, component: HomeComponent, canActivate: [AuthGuard] },
  { path: AppPaths.LOGIN_PATH, component: LoginComponent },
  { path: AppPaths.USERS_PATH, component: UserListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
