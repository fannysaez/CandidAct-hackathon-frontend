import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthHeader } from './auth-header';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AuthHeader],
  templateUrl: './login.html',
})
export class Login {
  credentials = { email: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.credentials.email, this.credentials.password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: () => (this.error = 'Identifiants incorrects'),
    });
  }
}