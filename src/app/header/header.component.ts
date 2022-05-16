import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private shared : SharedService, private route: Router) { }

  userName = this.shared.currentUser.email;

  onLogOut(){
    console.log('logout');
    localStorage.clear()
    this.route.navigate(['login'])
    
    
  }

  ngOnInit(): void {
    console.log(this.shared.currentUser);
    
  }

}
