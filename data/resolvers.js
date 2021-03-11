import axios from "axios"


export const resolvers = {
  Query: {
    getLanguges: () => {
      await axios.get(`https://manage.kontent.ai/v2/projects/${process.env.KONTENT_ID}/languages`, {
        headers: {
          'Authorization': ` bearer ${process.env.KONTENT_TOKEN}`,
          'Content-type': 'application/json'
        }
      })
        .then(res => resolve(res.data))
        .catch(err => console.log(err))
    },
    getNavigation: (languageCodeName) => {
      await axios.get(`https://deliver.kontent.ai/${process.env.KONTENT_ID}/
      items?language=${languageCodeName}&items.system.language[eq]=${languageCodeName}
      &depth=5&elements.title[eq]=root`)
        .then(res => resolve(res.data))
        .catch(err => console.log(err))
    },
    getPage: (id, languageCodeName) => {
      await axios.get(`https://deliver.kontent.ai/${process.env.KONTENT_ID}/
      items?language=${languageCodeName}&items.system.language[eq]=${languageCodeName}
      &system.id[eq]=${id}`)
        .then(res => resolve(res.data))
        .catch(err => console.log(err))
    },
  },
  Mutation: {
    //pass the data from kontent to algolia
    // sendAlgoliaData: await axios.
  }
}