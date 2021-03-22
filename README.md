# lp-help-center-backend

Backend for help center. It leverages express and graphql to serve kontent data
This project also updates agolia search data

## Available Scripts
In the project directory, you can run:
## `yarn`
Installs the latest versions of modules. You need to call this before running the project
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8080/graphql](http://localhost:8080/graphql) to view it in the browser.
This will open up the graphiql which also you to interact with the available queries

## ` yarn createSchema`
This uses kontent-generate-gql-schema to grab the kontent schemas and turn then into the latest version of types. Run this when changes to content types are made. 
This will be added to the build process to automatically update on build