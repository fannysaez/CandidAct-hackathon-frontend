import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  imports: [RouterLink],
  templateUrl: './auth-header.html',
})
export class AuthHeader {
  @Input() link = '';
  @Input() label = '';
}