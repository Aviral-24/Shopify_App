const {
  shopifyApi,
  LATEST_API_VERSION,
} = require("@shopify/shopify-api");

const shopify = shopifyApi({
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
});

module.exports = shopify;