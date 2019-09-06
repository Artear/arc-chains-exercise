/* eslint-disable no-prototype-builtins */
const pattern = (query = {}) => {
  const website = query["arc-site"] || "Arc Site is not defined";
  const { tagSlug, feedOffset = 0, feedSize = 5 } = query;
  const args = `${tagSlug}&size=${feedSize}&from=${feedOffset}&website=${website}`;
  return `/content/v4/search/published?q=taxonomy.tags.slug:${args}&sort=display_date:desc`;
};

const resolve = query => {
  if (query.hasOwnProperty("tagSlug")) {
    return pattern(query);
  }

  throw new Error("tagSlug is required");
};

export default {
  params: {
    tagSlug: "text",
    feedSize: "number",
    feedOffset: "number"
  },
  resolve,
  schemaName: "content-api"
};
