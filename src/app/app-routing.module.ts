import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddVendorComponent } from './components/dashboard/forms/add-vendor/add-vendor.component';
import { BlogListComponent } from './components/dashboard/body/blog-list/blog-list.component';
import { AddPostComponent } from './components/dashboard/forms/add-post/add-post.component';
import { BlogPostComponent } from './components/dashboard/body/blog-post/blog-post.component';
import { HomePageComponent } from './components/dashboard/body/home-page/home-page.component';
import { ContactUsComponent } from './components/dashboard/body/contact-us/contact-us.component';
import { DeletePostComponent } from './components/dashboard/forms/delete-post/delete-post.component';
import { AddStockDetailsComponent } from './components/dashboard/forms/add-stock-details/add-stock-details.component';
import { AddQualityReportComponent } from './components/dashboard/forms/add-quality-report/add-quality-report.component';
import { AocBlogComponent } from './components/dashboard/body/aoc-blog/aoc-blog.component';
import { StockDetailsComponent } from './components/dashboard/body/stock-details/stock-details.component';
import { QualityReportComponent } from './components/dashboard/body/quality-report/quality-report.component';


const routes: Routes = [
  {path:"xxx",redirectTo:"/dashboard/home",pathMatch:"full"},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"xx",redirectTo:"/dashboard/blog",pathMatch:"full"},
    {path:'blogxx',component:AocBlogComponent},
    {path:'homexx',component:HomePageComponent},
    {path:'contact-usxx',component:ContactUsComponent},
    {path:'add-vendorxx',component:AddVendorComponent},
    {path:'add-postxx',component:AddPostComponent},
    {path:'blog-postxx',component:BlogPostComponent},
    {path:'delete-postxx',component:DeletePostComponent},
    {path:'previewxx',component:BlogPostComponent},
    {path:'add-stockxx',component:AddStockDetailsComponent},
    {path:'add-qualityxx',component:AddQualityReportComponent},
    {path:'aboutusxx',component:AocBlogComponent},
    {path:'stock-detailsxx',component:StockDetailsComponent},
    {path:'quality-reportxx',component:QualityReportComponent},
    {path:'*xx*',component:HomePageComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[{LoginComponent,DashboardComponent}];
