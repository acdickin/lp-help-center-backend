import axios from "axios"
import { getPageResolver, getNavigationResolver, getAllLanguages } from "../delivery"
import dotenv from "dotenv";

dotenv.config();

export const resolvers = {
  ContentItem: {
    __resolveType: (obj, context, info) => {
      if (obj.subitems) {
        return "NavigationItemContentType"
      }
      if (obj.why_the_product_is_useful) {
        return "ProductOverviewContentType"
      }
      return null
    }
  },
  Query: {
    getLanguages: async () => {
      return await getAllLanguages();
    },
    getNavigation: (root, { languageCodeName }) => {
      return getNavigationResolver(languageCodeName);
    },
    getPage: (root, { id, languageCodeName }) => {
      return getPageResolver(id, languageCodeName);
    },
  },
  // Mutation: {
  //   //pass the data from kontent to algolia
  //   // sendAlgoliaData: await axios.
  // }
}
