import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  datas: any[] = [];
  email: string='';
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute  // Import ActivatedRoute from @angular/router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log('Email:', this.email);
    });

    this.userService.getAllDataStudent(this.email).subscribe(
      (response) => {
        if (response.status === 'success') {
          const data = response.data;

          // If the response is a single object, wrap it into an array
          // this.datas = Array.isArray(data) ? data : [{
          //   title: data.title,
          //   date: data.date,
          //   time: data.time,
          //   duration: data.duration,
          //   meetingUrl: data.meetingUrl
          // }];

          console.log('Filtered Data:', this.datas);
        } else {
          console.error('Failed to fetch data or unexpected data format');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  

}
