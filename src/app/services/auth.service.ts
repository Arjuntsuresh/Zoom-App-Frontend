import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private tokenKey = 'Admintoken';
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
