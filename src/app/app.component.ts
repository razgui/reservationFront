import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reservation';
  loading : boolean = false
  ngOnInit(): void {
    this.loading = true
    setTimeout(()=>{
      this.loading = false
    },1000)
  }

}
