import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-zoom-detail',
  templateUrl: './edit-zoom-detail.component.html',
  styleUrls: ['./edit-zoom-detail.component.scss']
})
export class EditZoomDetailComponent implements OnInit {

  meetingId: string='';
  retrivedData: any;
  
  constructor(private route: ActivatedRoute,
    private usersService: UsersService
  ) { }
  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getDataById(this.meetingId).subscribe(response => {
      // console.log('Data fetched', response.data);
      this.retrivedData = response.data;
      this.retrivedData.duration = this.convertSecondsToTime(this.retrivedData.duration);
      this.retrivedData.date = this.formatDate(this.retrivedData.date);
      console.log(this.retrivedData.date);
      
    })
  }
  convertSecondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  // Helper function to pad single digit values with a zero
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // Months are 0-indexed
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }
  
  searchForm:any;
  submitSearch(){

  }
}
