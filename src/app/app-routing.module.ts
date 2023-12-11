import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SoinsComponent } from './soins/soins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  { path: 'dashboard', component: DashboardComponent },
  {path : 'patient' , component : PatientComponent},
  {path : 'schedule' , component : ScheduleComponent},
  {path : 'soins' , component : SoinsComponent},
  {path : 'aboutus' , component : AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
