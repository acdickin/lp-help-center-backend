import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  
  type Page {

  }
  type Search {

  }
  type page
  type Languges{
    langauge:[Language]
  }

  type Language {
    id: ID
    name: String
    codename: String
    is_active: Boolean
    is_default: Boolean
    fallback_language: {
      id: ID
    }
  }

  type Query {
    getLanguges:Languages
    getSearchData(language:String):[Search]
    getPageData(i:ID, language:String):[Page]
    getNavigation(language:String)
  }

  input SearchInput{
    
  }
  type Mutation {
    createSearchData(SearchInput):
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };