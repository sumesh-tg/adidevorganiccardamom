import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  validateUserLogin(username, password) {
    if (username == "admin" && password == "admin") {
      this.router.navigate(["/admin/dashboard"], { relativeTo: this.route });
    }
  }
}
