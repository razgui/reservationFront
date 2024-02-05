import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public title="default";
  @Input() public infos:any;
  @Input() public chartType ="pie";
  constructor() { }

  ngOnInit(): void {
    console.log("infos",this.infos);
    console.log("chartType",this.chartType);
    
  }

}
