import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private tokenKey = 'Admintoken';
  private tokenKeyStudent = 'Student-token'
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  isStudentLoggedIn(): boolean {
    return!!localStorage.getItem(this.tokenKeyStudent);
  }
}
