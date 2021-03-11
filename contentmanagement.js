const dotenv = require('dotenv');
dotenv.config();
const { ManagementClient } = require('@kentico/kontent-management');

module.exports = new ManagementClient({
    projectId: process.env.KONTENT_ID,
    apiKey: process.env.KONTENT_TOKEN
});