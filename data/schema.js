import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { TYPE_DEFINITION } from './config'
const typeDefs = TYPE_DEFINITION + `
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
    getPage(i:ID, languageCodeName:String):ProductOverviewContentType
    getNavigation(languageCodeName:String):[NavigationItemContentType]
  }

  input SearchInput{
    
  }
  type Mutation {
    createSearchData(SearchInput):
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };