import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApplicationSearchComponent } from '../components/application-search/application-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ApplicationSearchComponent
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}