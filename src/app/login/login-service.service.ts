import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private apollo: Apollo) {}

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
      }).pipe(
        map((resp) => {
          console.log(resp.data);
          
          this.userLogin(resp.data);
          return resp;
        })
      );
  }

  userLogin(data: any) {
    const token = data
    localStorage.setItem(
      environment.tokenKey,
      JSON.stringify(data.loginUser.token)
    );
  }
}
