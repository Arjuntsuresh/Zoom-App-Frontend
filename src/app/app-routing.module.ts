import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditZoomDetailComponent } from './components/edit-zoom-detail/edit-zoom-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LogInComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path:'edit/:id', component: EditZoomDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
