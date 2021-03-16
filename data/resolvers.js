import axios from "axios"
import { getPageResolver, getNavigationResolver, getAllPagesResolver } from "../delivery"
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
    getLanguages: () => {
      return axios.get(`https://manage.kontent.ai/v2/projects/${process.env.KONTENT_ID}/languages`, {
        headers: {
          'Authorization': ` bearer ${process.env.KONTENT_TOKEN}`,
          'Content-type': 'application/json'
        }
      })
        .then(res => res.data).catch(err => console.log(err))
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
