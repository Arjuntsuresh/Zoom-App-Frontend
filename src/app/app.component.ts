import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private router:ActivatedRoute,
    private route: Router,  // Assuming UsersService is a service that handles token requests
    private userService: UsersService // Assuming UserService is a service that handles token requests
  ){}
  ngOnInit(): void {
    
     
       
      
  }
 
}
