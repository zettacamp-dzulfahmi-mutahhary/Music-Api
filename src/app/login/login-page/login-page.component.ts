import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  loginForm: FormGroup;
  errorMessage: string;
  isLoading = false;

  formInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    // console.log(this.loginForm.value);
    this.loginService.isLoading$.next(true);
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);   
        setTimeout(() => {
          this.loginService.isLoading$.next(false);
          this.router.navigate(['song']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error;
        this.loginService.isLoading$.next(false);
      },
    });
  }

  ngOnInit(): void {
    this.loginService.isLoadingObs.subscribe((data) => (this.isLoading = data));
    this.formInit();
    
  }

  ngOnDestroy(): void {}
}
