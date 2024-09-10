import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './services/users.service';
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
 
}
