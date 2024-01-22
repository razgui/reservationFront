import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  display : boolean = false
  themeMode: string = ""
  themeChecked : boolean = false
  constructor(private router : Router){

  }

  navigateToScreen(event : string){
    switch(event){
      case "home" :
        this.router.navigate(['/dashboard']);
        break;
      case "patient" :
        this.router.navigate(['/patient']);
        break;
      case "dashboard" :
        this.router.navigate(['']);
        break;
      case "schedule" :
        this.router.navigate(['/schedule']);
        break;
      case "soins" :
        this.router.navigate(['/soins']);
        break;
        case "aboutus" :
          this.router.navigate(['/aboutus']);
          break;
    }
    this.display = false
  }


}
