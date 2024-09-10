import { Component, OnInit } from '@angular/core';
import { DataItem } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  datas: DataItem[] = [];

  constructor(
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllData().subscribe(
      (response) => {
        // console.log(response);

        if (response.status === 'success' && Array.isArray(response.data)) {
          this.datas = response.data;
        } else {
          console.error('Failed to fetch data or unexpected data format');
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  updateMeeting(id: any) {
    this.router.navigate(['/edit',id]);
  }
  deleteMeeting(id: any) {
    this.userService.deleteMeeting(id).subscribe({
      next: (responce) => {
        console.log('Meeting deleted successfully:', responce); // Debugging log
        this.snackbar.open('Meeting deleted successfully!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right', // Snackbar position
        });
        this.datas = this.datas.filter((data) => data._id !== id);
        return this.ngOnInit();
      },
      error: (error) => {
        this.snackbar.open(
          'Failed to delete meeting. Please try again later.',
          'Close',
          {
            duration: 2000,
          }
        );
        console.error('Error deleting meeting', error);
      },
    });
  }

  submit() {
    const zoomAuthUrl = environment.baseUrl;
    window.location.href = zoomAuthUrl;
  }
}
