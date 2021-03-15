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
      // console.log(response.items[0])
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
      // console.log(response.items[0].subitems.value)
      return (response.items[0].subitems.value)
    },
      (err => err));

}


export { deliveryClient, getPageResolver, getNavigationResolver } 