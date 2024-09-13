import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private auth:AuthService
  ){}
  ngOnInit(): void {
  }

  isAdminLoggedIn(): boolean {
    return this.auth.isAdminLoggedIn();
  }
  
  isStudentLoggedIn(): boolean {
  return this.auth.isStudentLoggedIn();
  }
 
}
