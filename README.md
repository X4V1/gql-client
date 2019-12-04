# GraphQL

## Documents validation

Run `npm run graphql:validate` to validate all the documents (queries, mutations and fragments)

## Models generation

As graphql is strongly typed, the typescript client application needs to update the models everytime it changes.
Run `npm run graphql:generate` to generates the typescript types, download the schema and generate the fragment matchers.

## Documents diff

If the models has changed, the first step is te check if our documents needs to be updated (cf Documents validation).
If the validation fails, then run `npm run graphql:diff` to compare the schema downloaded during the last model generation with the actual schema.

## Schema coverage

Run `npm run graphql:coverage` to find out how many times types and fields are used in your application.

## Visual representation of the Schema

https://apis.guru/graphql-voyager/ allow you to paste your schema and get a visual representation.

## Testing

For testing purpose there is an easy way to start a fake server. Simply run `npm run graphql:serve`
