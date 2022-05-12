import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    LoginPageComponent
  ]
})
export class LoginModule { }
