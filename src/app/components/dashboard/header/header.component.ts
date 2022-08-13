import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePageComponent } from '../body/home-page/home-page.component';
import { DashboardComponent } from '../dashboard.component';
import * as $ from 'jquery' ;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      "use strict";
      // Scroll view stock
      $("#stock-details-menu").click(function(){
          $('html, body').animate({
            scrollTop: $('#stockDetailsSection').offset().top
        }, 'slow');
      });
      // Scroll view report
      
      $("#quality-report-menu").click(function(){
        $('html, body').animate({
          scrollTop: $('#qualityReportSection').offset().top
      }, 'slow');
    });
    $('#navbarCollapse .navbar-nav>li>a').on('click', function(){
      // $('navbarCollapse').collapse('hide');
  });
    });
  }
  navigateToStock() {
    //this.navElementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }


}
