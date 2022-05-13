import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { setContext } from '@apollo/client/link/context';

const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here



export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: uri });
  const authLink = new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem(environment.tokenKey);
    console.log(`token ${token}`);
    

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29lbXBhdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pY29lbXBhdCIsImlhdCI6MTY1MjQxMTA4MiwiZXhwIjoxNjUyNDE0NjgyfQ.u74G33XavUBlpU4eq29MyFhZu8q-DZIHouInNwjGqg0",
        // `JWT ${token}`,
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
