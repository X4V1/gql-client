import {Component, OnInit} from '@angular/core';
import {GetConfigGQL, GetConfigQuery} from './graphql/generated/graphql';
import {ApolloQueryResult} from 'apollo-client';
import {GraphQLError} from 'graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  errors: ReadonlyArray<GraphQLError>;
  loading: boolean;
  data: GetConfigQuery;

  constructor(private getConfigGQL: GetConfigGQL) {
  }

  ngOnInit() {
    this.getConfigGQL.fetch().subscribe((result: ApolloQueryResult<GetConfigQuery>) => {
      this.errors = result.errors;
      this.loading = result.loading;
      this.data = result.data;
    });
  }
}
