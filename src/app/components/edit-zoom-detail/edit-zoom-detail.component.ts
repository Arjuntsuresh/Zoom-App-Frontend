import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { searchData } from 'src/app/model/searchData';
@Component({
  selector: 'app-edit-zoom-detail',
  templateUrl: './edit-zoom-detail.component.html',
  styleUrls: ['./edit-zoom-detail.component.scss']
})
export class EditZoomDetailComponent implements OnInit {

  meetingId: string='';
  retrivedData: any;
  
  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private builder: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getDataById(this.meetingId).subscribe(response => {
      this.retrivedData = response.data;
      this.retrivedData.duration = this.convertSecondsToTime(this.retrivedData.duration);
      this.retrivedData.date = this.formatDate(this.retrivedData.date)
      this.searchForm.patchValue({
        date: this.retrivedData.date,
        time: this.retrivedData.time,
        title: this.retrivedData.title,
        duration: this.retrivedData.duration
      });

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
  
  searchForm:FormGroup =this.builder.group({
    date:['', Validators.required],
    time:['', Validators.required],
    title:['', Validators.required],
    duration:['', Validators.required]
  });
  submitSearch(){
    if(this.searchForm.invalid){
      this.showErrors();
    }else{
      const searchData:searchData ={
        date:this.searchForm.get('date')?.value,
        time:this.searchForm.get('time')?.value,
        topic:this.searchForm.get('title')?.value,
        duration:this.searchForm.get('duration')?.value
      };
      this.userService.updateMeeting(this.meetingId,searchData).subscribe({
        next:(response)=>{
          this.snackBar.open('Meet updated successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
          this.router.navigate(['/admin-dashboard']); // Navigate to home page after successful application
        },
        error:(error)=>{
          console.error(error);
          this.snackBar.open('Failed to update meeting', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
        }
      })
    }
  }
  showErrors() {
    const controlOrder = ['date', 'time','topic']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      date: 'Date',
      time: 'Time',
      topic:'Title'
    };
    for (const name of controlOrder) {
      const control = this.searchForm.get(name);

      if (control && control.invalid) {
        if (control.errors?.['required']) {
          const label = controlLabels[name] || name; // Use label or fallback to the control name
          this.snackBar.open(`${label} is required`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
        }
        break; // Stop after showing the first error
      }
    }
  }
}
