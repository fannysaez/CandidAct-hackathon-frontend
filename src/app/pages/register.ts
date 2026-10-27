import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthHeader } from './auth-header';

@Component({
  selector: 'app-register',
  imports: [FormsModule, AuthHeader],
  templateUrl: './register.html',
})
export class Register {
  user = { firstname: '', lastname: '', email: '', password: '' };
  errors: string[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.errors = [];
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (e: any) => (this.errors = e.error?.errors ?? ['Erreur serveur']),
    });
  }
}