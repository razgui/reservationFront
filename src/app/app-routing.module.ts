import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SoinsComponent } from './soins/soins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { homeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  {path : 'patient' , component : PatientComponent , canActivate: [AuthGuard]},
  {path : 'schedule' , component : ScheduleComponent , canActivate: [AuthGuard]},
  {path : 'soins' , component : SoinsComponent, canActivate: [AuthGuard]},
  {path : 'aboutus' , component : AboutUsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
