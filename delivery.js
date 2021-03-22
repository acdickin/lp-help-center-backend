import axios from 'axios'

require("dotenv").config({
  path: `./.env`,
})

const KontentDelivery = require('@kentico/kontent-delivery');

const deliveryClient = new KontentDelivery.DeliveryClient({
  projectId: process.env.KONTENT_ID,
});
function getPageResolver(id, languageCodeName) {
  return deliveryClient
    .items()
    .type('product_overview')
    .languageParameter(languageCodeName)
    .equalsFilter("system.id", id)
    .toPromise()
    .then((response) => {
      return (response.items[0]);
    }, err => console.log(err));
}
function getNavigationResolver(languageCodeName) {
  return deliveryClient
    .items()
    .languageParameter(languageCodeName)
    .equalsFilter('items.system.language', languageCodeName)
    .depthParameter(5)
    .equalsFilter("elements.title", 'root')
    .toPromise()
    .then((response) => {
      return (response.items[0].subitems.value)
    },
      (err => err));

}
function getAllPagesResolver(languageCodeName) {
  return deliveryClient
    .items()
    .type('product_overview')
    .languageParameter(languageCodeName)
    .equalsFilter('items.system.language', languageCodeName)
    .toPromise()
    .then((response) => {
      return (response.items)
    },
      (err => err));
}

const getAllLanguages = () => {
  return axios.get(`https://manage.kontent.ai/v2/projects/${process.env.KONTENT_ID}/languages`, {
    headers: {
      'Authorization': ` bearer ${process.env.KONTENT_TOKEN}`,
      'Content-type': 'application/json'
    }
  }).then(res => {
    return res.data
  }).catch(err => console.log(err))
}

export { getPageResolver, getNavigationResolver, getAllPagesResolver, getAllLanguages }