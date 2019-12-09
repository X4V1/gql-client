import {Component} from '@angular/core';
import {GetConfigGQL, GetConfigQuery} from './graphql/generated/graphql';
import {ApolloQueryResult} from 'apollo-client';
import {catchError, filter, map, pluck, share, take, tap} from 'rxjs/operators';
import {merge, Observable, of} from 'rxjs';
import {stringify} from 'flatted/esm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response$: Observable<string>;

  constructor(private getConfigGQL: GetConfigGQL) {
  }

  fetch() {
    const data$: Observable<ApolloQueryResult<GetConfigQuery>> = this.getConfigGQL.fetch().pipe(share());

    const errors$ = data$.pipe(
      take(1),
      pluck('errors'),
      filter(r => !!r),
      map(e => 'Errors: ' + stringify(e)),
      catchError(e => of('Error not related to GraphQL: ' + e))
    );

    const environment$ = data$.pipe(
      take(1),
      pluck('data'),
      filter(r => !!r),
      map(d => 'Environment: ' + d.config.environment)
    );

    this.response$ = merge(errors$, environment$);
  }

  clear() {
    delete this.response$;
  }
}
