import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdSidebarComponent } from './components/ad-sidebar/ad-sidebar.component';
import { AdFooterComponent } from './components/ad-footer/ad-footer.component';
import { AdBodyComponent } from './components/ad-body/ad-body.component';
import { AddQuestionsComponent } from './components/forms/add-questions/add-questions.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';


@NgModule({
  declarations: [AdminHomeComponent, AdSidebarComponent, AdFooterComponent, AdBodyComponent, AddQuestionsComponent,  AdminDashboardComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
