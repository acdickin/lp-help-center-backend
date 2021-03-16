import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';
import { getAllPages } from './delivery'
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

async function updateAlgolia() {

  const allPages = await getAllPages('en');
  const data = allPages.map(page => {
    return pagetoAlgoliaRecord(page)
  })
  console.log(data)
  // index.saveObjects(data)
}

const removeTags = (html) => {
  // removes html tags so there is only text
  return html.replace(/(<([^>]+)>)/ig, '')
}
const pagetoAlgoliaRecord = (item) => {
  const {
    id, language, body, post_tags, product_description,
    title, url, why_the_product_is_useful } = item.system;

  return {
    objectID: id,
    language: language,
    body: removeTags(body.value),
    post_tags: post_tags.value.map(value => value.name) || '',
    product_description: removeTags(product_description.value),
    title: removeTags(title.value),
    url: url.value,
    why_the_product_is_useful: removeTags(why_the_product_is_useful.value)
  }
}

// a

app.listen(8080, () => console.log('Running on server port localhost:8080/graphql'));