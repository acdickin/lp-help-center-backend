import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';
import { getAllPagesResolver } from './delivery'
import algoliasearch from 'algoliasearch';
require("dotenv").config({
  path: `./.env`,
})

const app = express();

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
  // TODO make this a batch job/only grab ones that updated lately
  getAllPagesResolver('en').then((allPages) => {
    const data = allPages.map(page => {
      return pagetoAlgoliaRecord(page)
    })
    index.saveObjects(data)
  })
}

const removeTags = (html) => {
  // removes html tags so there is only text

  return html.replace(/(<([^>]+)>)/ig, '').replace('&nbsp;', ' ');
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

updateAlgolia()

app.listen(8080, () => console.log('Running on server port localhost:8080/graphql'));