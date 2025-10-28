import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  login(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedIn.next(false);
  }

  getUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
}
