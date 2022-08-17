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
  {path:"",redirectTo:"/dashboard/home",pathMatch:"full"},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
    {path:'blog',component:AocBlogComponent},
    {path:'home',component:HomePageComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'add-vendor',component:AddVendorComponent},
    {path:'add-post',component:AddPostComponent},
    {path:'blog-post',component:BlogPostComponent},
    {path:'delete-post',component:DeletePostComponent},
    {path:'preview',component:BlogPostComponent},
    {path:'add-stock',component:AddStockDetailsComponent},
    {path:'add-quality',component:AddQualityReportComponent},
    {path:'aboutus',component:AocBlogComponent},
    {path:'stock-details',component:StockDetailsComponent},
    {path:'quality-report',component:QualityReportComponent},
    {path:'**',component:HomePageComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[{LoginComponent,DashboardComponent}];
