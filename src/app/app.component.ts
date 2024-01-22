import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reservation';
  currentRoute : string | undefined = ""
  loading : boolean = false
  themeMode: string = 'lightMode';
  appliedTheme : string = "lightMode"
  constructor(private router: Router,private activatedRoute: ActivatedRoute){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the current route path
      this.currentRoute = this.activatedRoute?.snapshot?.firstChild?.routeConfig?.path;
      console.log('Current Route Path:', this.currentRoute);
    });
  }
  ngOnInit(): void {
    this.loading = true
    setTimeout(()=>{
      this.loading = false
    },500)
  }
  

}
