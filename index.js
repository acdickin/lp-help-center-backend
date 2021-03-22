import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';
import { getAllPagesResolver, getAllLanguages } from './delivery'
import algoliasearch from 'algoliasearch';
import cors from 'cors';

require("dotenv").config({
  path: `./.env`,
})

const app = express();
app.use(cors());

const algoliaClient = algoliasearch(process.env.AGOLIA_ID, process.env.ALGOLIA_KEY);
const index = algoliaClient.initIndex(process.env.ALGOLIA_INDEX);
app.get('/', (req, res) => {
  res.send('Welcome to help center backend');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));



function updateAlgolia() {
  // TODO instead get the list of items from the nav(so we dont add extra pages)
  // get all languages
  getAllLanguages().then(all => {
    all.languages.forEach(lang => {
      if (lang.is_active) {
        getAllPagesResolver(lang.codename).then((allPages) => {
          const data = allPages.map(page => {
            return pagetoAlgoliaRecord(page)
          })
          //pushes changes to algolia
          index.partialUpdateObjects(data, {
            createIfNotExists: true
          })
        })
      }
    })
  })
}

const pagetoAlgoliaRecord = (item) => {
  const { id, language } = item.system;
  const { body, post_tags, product_description,
    title, url, why_the_product_is_useful } = item
  //Cleaned up vesrion of the data for algolia
  return {
    objectID: id,
    language: language,
    body: removeTags(body.value),
    post_tags: (post_tags.value !== []) ? post_tags.value.map(value => value.name) : '',
    product_description: removeTags(product_description.value),
    title: removeTags(title.value),
    url: url.value,
    why_the_product_is_useful: removeTags(why_the_product_is_useful.value)
  }
}

const removeTags = (html) => {
  // removes html tags so there is only text
  return html.replace(/(<([^>]+)>)/ig, '').replace(/\&nbsp;/ig, ' ');
}

updateAlgolia()

app.listen(8080, () => console.log('Running on server port localhost:8080/graphql'));