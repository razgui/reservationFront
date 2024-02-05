import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userData:any;
  lineData:any;
  reservationSize:any;
  resrvationBookedToday:any; 
  patientNumber:any;
  constructor(private reservationService :ReservationService,private patientService: PatientService) { }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    this.reservationService.getReservationSizeToday().subscribe((data: any) => {
      
      this.reservationSize = data ; 
    });
    
    this.reservationService.getReservationBookingTodaySize().subscribe((data: any) => {  
      this.resrvationBookedToday = data; 
    });
    

    this.patientService.getPatientNumber().subscribe((data: any) => {  
      this.patientNumber = data; 
    });

    this.reservationService.getReservationPerMonth().subscribe((data: any) => {  
      this.lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Rendez-vous',
            data: data ,
            backgroundColor: '#42A5F5',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4
          }
        ]
      };
    });


    this.patientService.getPatientAddedPerMonth().subscribe((data: any) => {  
      this.userData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Patient ajouté par mois',
                data: data,
                backgroundColors : ['#4CAF50', '#F44336', '#4CAF50', '#F44336', '#4CAF50', '#F44336', '#4CAF50', '#F44336', '#4CAF50', '#F44336', '#4CAF50', '#F44336'],
                hoverBackgroundColors : ['#45a049', '#d32f2f', '#45a049', '#d32f2f', '#45a049', '#d32f2f', '#45a049', '#d32f2f', '#45a049', '#d32f2f', '#45a049', '#d32f2f']
            }
        ]
    };
    });

  

  }
  

}
