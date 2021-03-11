import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';

const app = express();

const res = await axios.get(`https://manage.kontent.ai/v2/projects/${process.env.KONTENT_ID}/languages`, {
  headers: {
    'Authorization': ` bearer ${process.env.KONTENT_TOKEN}`,
    'Content-type': 'application/json'
  }
});
(``)
app.get('/', (req, res) => {
  res.send('Graphql is amazing!');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running on server port localhost:8080/graphql'));