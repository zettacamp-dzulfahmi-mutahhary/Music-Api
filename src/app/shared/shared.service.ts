import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  constructor(private jwtHelper : JwtHelperService) { }

  currentUser: any = {email: 'User'};

  getJWTPayload(token: string){
   this.currentUser = this.jwtHelper.decodeToken(token);
  }


}
