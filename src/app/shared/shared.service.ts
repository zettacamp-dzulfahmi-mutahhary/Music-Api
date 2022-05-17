import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  constructor(private jwtHelper : JwtHelperService) { }

  currentUser: any = {email: 'User'};

  getJWTPayload(){
   const tokenKey = localStorage.getItem('token')
   this.currentUser = this.jwtHelper.decodeToken(tokenKey);
   console.log(tokenKey);
   
  }


}
