import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginDetails } from 'src/app/model/searchData';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent {

  constructor(private builder: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  signInForm: FormGroup = this.builder.group({
    // Direct initialization
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submitSearch() {
    if (this.signInForm.invalid) {
      this.showErrors();
    } else {
      const logInData: loginDetails = {
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value,
      };
      this.userService.loginStudent(logInData).subscribe({
        next: (res) => {
          if (res.status === 'success' && res.token) {
            localStorage.setItem('Student-token', res.token); // Store token in local storage
            this.snackBar.open('Successfully signed in', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.router.navigate(['/student-dashboard'],{
              queryParams: { email: logInData.email }
            }); // Navigate to the home page after successful login
          } else {
            this.snackBar.open('Failed to sign in', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
        },
        error: () => {
          this.snackBar.open('Failed to sign in', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }
  showErrors() {
    const controlOrder = ['email', 'password']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
    };
    for (const name of controlOrder) {
      const control = this.signInForm.get(name);
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
