import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private apollo: Apollo) {}

  isLoggedIn$ = new BehaviorSubject(false);
  isLoggedInObs = this.isLoggedIn$.asObservable();

  isLoading$ = new BehaviorSubject(false);
  isLoadingObs = this.isLoading$.asObservable();

  loginUser(userInput: { email: string; password: string }): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation LoginUser($userInput: LoginUserInput) {
            loginUser(user_input: $userInput) {
              email
              token
            }
          }
        `,
        variables: {
          userInput,
        },
      })
      .pipe(
        map((resp) => {
          this.userLogin(resp.data['loginUser'].token);
          return resp;
        })
      );
  }

  userLogin(token: any) {
    if (!token) {
      throw new Error("You're Not Authenticated");
    }
    localStorage.setItem(environment.tokenKey, JSON.stringify(token));
    this.isLoggedIn$.next(true);
    this.isLoggedInObs.subscribe((data) => console.log(`login : ${data}`));
  }
}
