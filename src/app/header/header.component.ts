import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login/login-service.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private shared: SharedService,
    private route: Router,
    public loginService: LoginServiceService
  ) {}

  userName = this.shared.currentUser.email;

  onLogOut() {
    console.log('logout');
    localStorage.clear();
    this.loginService.isLoggedIn$.next(false);
    this.route.navigate(['login']);
  }

  ngOnInit(): void {}
}
