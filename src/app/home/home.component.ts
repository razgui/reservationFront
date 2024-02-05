import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class homeComponent {
  sideBarOpen= false;
  date=Date.now();
  constructor(){
  }

  sideBarToggler(e:any){
    this.sideBarOpen=!this.sideBarOpen;
  }

}
