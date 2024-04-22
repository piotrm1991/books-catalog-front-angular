import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { StorageService } from '../util/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor (
    private builder: FormBuilder, 
    private toastr: ToastrService, 
    private service: AuthenticationService, 
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storage.checkIfLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  loginForm = this.builder.group({
    login: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
        next: (data: string | undefined) => {
          this.storage.logIn();
          this.toastr.success(data, "", {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['']);
        },
        error: () => {
          this.toastr.error('Invalid credentials!', '', {
            positionClass: 'toast-top-center'
          });
        }
      });
    } else {
      this.toastr.error('Invalid credentials!', '', {
        positionClass: 'toast-top-center'
      });
    }
  };

  reloadPage(): void {
    window.location.reload();
  }
}
