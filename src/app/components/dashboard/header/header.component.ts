import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePageComponent } from '../body/home-page/home-page.component';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navigateToStock() {
    //this.navElementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }


}
