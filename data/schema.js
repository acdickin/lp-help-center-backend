import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { TYPE_DEFINITION } from './config'
const typeDefs = TYPE_DEFINITION + `
  type Languages{
    languages:[LanguageModel]
  }
  type FallbackLanguage{
    id: ID
  }
  type LanguageModel {
    id: ID
    name: String
    codename: String
    is_active: Boolean
    is_default: Boolean
    fallback_language: FallbackLanguage
  }
  input LanguageFilter {
     is_active: Boolean
  }
  type Query {
    getLanguages:Languages
    getPage(id:ID,languageCodeName:String):ProductOverviewContentType
    getNavigation(languageCodeName:String): [ContentItem]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };