import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() toggleSideBarForMe : EventEmitter<any>=new EventEmitter();
  user:any;
  constructor(private router : Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.user= this.authService.getCurrentUser();
  }

  navigateToScreen(event : string){
    switch(event){
      case "accueil" :
        this.router.navigate(['/dashboard']);
        break;
      case "patient" :
        this.router.navigate(['/patient']);
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
    this.toggleSideBarForMe.emit();
  }

}
