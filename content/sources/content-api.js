/* eslint-disable no-prototype-builtins */
const resolve = (query = {}) => {
  const site = query["arc-site"] || query.website;

  if (query.hasOwnProperty("website_url")) {
    return `/content/v4/?website=${site}&website_url=${query.website_url}`;
  }

  throw new Error("website_url is required");
};

export default {
  params: {
    website_url: "text"
  },
  resolve,
  schemaName: "content-api"
};
