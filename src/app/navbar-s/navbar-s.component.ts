import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-s',
  templateUrl: './navbar-s.component.html',
  styleUrls: ['./navbar-s.component.scss']
})
export class NavbarSComponent implements OnInit {

  @Output() toggleSideBarForMe : EventEmitter<any>=new EventEmitter();
  constructor(private router : Router,private authService : AuthService) { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.toggleSideBarForMe.emit();
  }

  logout(){
    this.authService.logout()
    this.router.navigate([''])
  }

}
