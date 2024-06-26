import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpRequestInterceptor } from './_helpers/http.request.interpretor';
import { UserModule } from './user/user.module';
import { CookieService } from 'ngx-cookie-service';
import { CoreModule } from './core/core.module';
import { StatusTypeModule } from './status.type/status.type.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { RoomModule } from './room/room.module';
import { ShelfModule } from './shelf/shelf.module';
import { BookModule } from './book/book.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    CoreModule,
    StatusTypeModule,
    AuthorModule,
    PublisherModule,
    RoomModule,
    ShelfModule,
    BookModule,
    ToastrModule.forRoot()
  ],
  providers: [
    // Http Interceptor(s) -  adds with Client Credentials
    [
      { 
        provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true 
      },
      CookieService 
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
