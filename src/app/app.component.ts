import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'books-catalog-front-angular';

  showMenu = false;

  constructor (private router: Router, private service: AuthenticationService) {}

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
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
