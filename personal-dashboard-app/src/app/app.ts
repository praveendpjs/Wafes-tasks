import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './Components/Services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    // Subscribe to login state
    this.auth.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.auth.logout();
  }
  
}
