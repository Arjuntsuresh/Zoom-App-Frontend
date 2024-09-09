import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { searchData } from 'src/app/model/searchData';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ){}
  submit() {
  
      
      const zoomAuthUrl = environment.baseUrl;
      window.location.href = zoomAuthUrl;
   
  }
  
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
    time:['', Validators.required]
  });
  submitSearch(){
    if(this.searchForm.invalid){
      this.showErrors();
    }else{
      const searchData:searchData ={
        date:this.searchForm.get('date')?.value,
        time:this.searchForm.get('time')?.value
      };
      this.userService.applyZoom(searchData).subscribe({
        next:(response)=>{
         // console.log(response);
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
    const controlOrder = ['date', 'time']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      date: 'Date',
      time: 'Time',
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
