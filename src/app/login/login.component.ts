import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (
    private builder: FormBuilder, 
    private toastr: ToastrService, 
    private service: AuthenticationService, 
    private router: Router
  ) {}

  loginForm = this.builder.group({
    login: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
        next: data => {
          this.service.isLoggedIn = true;
          this.toastr.success(data);
          this.router.navigate(['']);
        },
        error: err => {
          this.toastr.error('Invalid credentials!');
        }
      });
    } else {
      this.toastr.error('Invalid credentials!');
    }
  };

  reloadPage(): void {
    window.location.reload();
  }
}
