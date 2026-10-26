import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  user = { firstname: '', lastname: '', email: '', password: '' };
  errors: string[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.errors = [];
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (e: any) => (this.errors = e.error?.errors ?? ['Erreur serveur'])
    });
  }
}