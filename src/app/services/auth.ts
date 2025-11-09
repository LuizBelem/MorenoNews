import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private PROFILE_KEY = 'moreno_user';

  private userSubject = new BehaviorSubject<UserData | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  private loadUser(): UserData | null {
    const stored = localStorage.getItem(this.PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  login(name: string, email: string) {
    const user: UserData = { name, email };
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem(this.PROFILE_KEY);
    this.userSubject.next(null);
  }

  get currentUser(): UserData | null {
    return this.userSubject.value;
  }
}
