import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { VendorListComponent } from './body/vendor-list/vendor-list.component';
import { HomePageComponent } from './body/home-page/home-page.component';
import { BlogListComponent } from './body/blog-list/blog-list.component';
import { ContactUsComponent } from './body/contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddStockDetailsComponent } from './forms/add-stock-details/add-stock-details.component';
import { AddQualityReportComponent } from './forms/add-quality-report/add-quality-report.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  enableWhatsappFixed:boolean=true;
  @ViewChild(SidebarComponent, { read: ElementRef }) private sidebarCloseBtn: ElementRef;
  toggleAddVendorBtn = false;
  togglePageInfo=false;
  breadcrumbTxt="";
  constructor() { }

  ngOnInit(): void {
  }
  onActivate(componentRef) {
    (componentRef instanceof VendorListComponent) ? this.toggleAddVendorBtn = false : this.toggleAddVendorBtn = true;
    (componentRef instanceof HomePageComponent) ? this.togglePageInfo = false : this.togglePageInfo = true;
    (componentRef instanceof BlogListComponent) ? this.breadcrumbTxt = "Blog" : this.breadcrumbTxt=this.breadcrumbTxt;
    (componentRef instanceof ContactUsComponent) ? this.breadcrumbTxt = "Contact Us" : this.breadcrumbTxt = this.breadcrumbTxt;
    // setTimeout(() => {
    //   this.sidebarCloseBtn.nativeElement.click();
    //   }, 200);

      if(componentRef instanceof AddStockDetailsComponent || componentRef instanceof AddQualityReportComponent){
        this.enableWhatsappFixed=false
      }else{
        this.enableWhatsappFixed=true
      }
  }
}
