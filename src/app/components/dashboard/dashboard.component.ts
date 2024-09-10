import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { searchData } from 'src/app/model/searchData';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      console.log(code);
      if (code) {
        this.userService.getToken(code).subscribe((job) => {
         console.log(job);
        });
      }
    });
  }
  title = 'frontend';
  searchForm:FormGroup =this.builder.group({
    date:['', Validators.required],
    time:['', Validators.required],
    topic:['', Validators.required],
    duration:['', Validators.required]
  });
  submitSearch(){
    if(this.searchForm.invalid){
      this.showErrors();
    }else{
      const searchData:searchData ={
        date:this.searchForm.get('date')?.value,
        time:this.searchForm.get('time')?.value,
        topic:this.searchForm.get('topic')?.value,
        duration:this.searchForm.get('duration')?.value
      };
      this.userService.applyZoom(searchData).subscribe({
        next:(response)=>{
          console.log(response);
          this.snackBar.open('Zoom application successful', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
          this.router.navigate(['/admin-dashboard']); // Navigate to home page after successful application
        },
        error:(error)=>{
          console.error(error);
          this.snackBar.open('Failed to apply Zoom', 'Close', {
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
