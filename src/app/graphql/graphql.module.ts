import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionResult from './generated/fragment-matcher-introspection';
import {GraphQLServices} from './generated/graphql-services.module';

const generatedServices = [];

const uri = 'http://localhost:8080/rqm-gateway-gql/graphql/'; // <-- add the URL of the GraphQL server here

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData: introspectionResult});

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache({ fragmentMatcher }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  imports: [
    GraphQLServices
  ],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    ...generatedServices,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
