import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {SidebarModule} from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SoinsComponent } from './soins/soins.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { LoaderMaskComponent } from './loader-mask/loader-mask.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientComponent,
    DashboardComponent,
    SoinsComponent,
    ScheduleComponent,
    LoaderMaskComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
