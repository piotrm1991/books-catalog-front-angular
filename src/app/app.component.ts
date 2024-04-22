import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { StorageService } from './util/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'books-catalog-front-angular';

  showMenu = false;

  constructor (private router: Router, private service: AuthenticationService, private storage: StorageService) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login') {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }

  logout() {
    this.service.logout().subscribe(() =>{
      this.storage.logOut();
      this.router.navigate(['/login']);
    });
  }
}
