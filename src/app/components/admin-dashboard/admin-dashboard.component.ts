import { Component, OnInit } from '@angular/core';
import { DataItem } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  datas: DataItem[] = [];

  constructor(private userService: UsersService) { }
  
  ngOnInit(): void {
    this.userService.getAllData().subscribe((response) => {
      console.log(response); 
  
      if (response.status === 'success' && Array.isArray(response.data)) {
        this.datas = response.data; 
      } else {
        console.error('Failed to fetch data or unexpected data format');
      }
    }, error => {
      console.error('Error fetching data', error);
    });
  }
  

}
