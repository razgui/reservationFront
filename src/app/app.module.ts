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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingComponent } from './booking/booking.component';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';


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
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    FullCalendarModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule
  ],
  providers: [
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
