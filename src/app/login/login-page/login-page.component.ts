import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  loginForm: FormGroup;

  formInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    
    this.loginService
      .loginUser(this.loginForm.value)
      .subscribe((data) => console.log(data));

    this.router.navigate(['song']);
  }

  ngOnInit(): void {
    this.formInit();
  }
}
