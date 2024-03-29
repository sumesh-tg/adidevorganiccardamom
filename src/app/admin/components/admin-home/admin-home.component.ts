import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  userModel: User;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  validateUserLogin(username, password) {
    if (username == "admin" && password == "admin") {
      this.router.navigate(["/admin/dashboard"], { relativeTo: this.route });
    }
  }
}
