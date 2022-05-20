import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  constructor(private jwtHelper : JwtHelperService) { }

  currentUser;

  getJWTPayload(tokenKey){
   this.currentUser = this.jwtHelper.decodeToken(tokenKey);
  }


}
