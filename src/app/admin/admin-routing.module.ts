import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQualityReportComponent } from '../components/dashboard/forms/add-quality-report/add-quality-report.component';
import { AddStockDetailsComponent } from '../components/dashboard/forms/add-stock-details/add-stock-details.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AddQuestionsComponent } from './components/forms/add-questions/add-questions.component';


const routes: Routes = [{
  path: "admin", component: AdminHomeComponent, children: [
    { path: "", redirectTo: "/admin/login", pathMatch: "full" },
    { path: "login", component: AdminLoginComponent },
    {
      path: "dashboard", component: AdminDashboardComponent, children: [
        { path: "add-stock", component: AddStockDetailsComponent },
        { path: "add-report", component: AddQualityReportComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
