const dotenv = require('dotenv');
dotenv.config({ path: `./.env` });
import { ManagementClient } from '@kentico/kontent-management';

export const managementClient = new ManagementClient({
  projectId: process.env.KONTENT_ID,
  apiKey: process.env.KONTENT_TOKEN
});
function getLangugesResolver() {
  return managementClient
    .listLanguages()
    .toPromise()
    .then((response) => {
      console.log(response.data.items)
      return (response.data.items)
    },
      (error) => {
        console.log(error);
      });
}
export { getLangugesResolver }