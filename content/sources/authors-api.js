/* eslint-disable no-prototype-builtins */
/* eslint-disable arrow-body-style */
const pattern = (query = {}) => {
  const website = query["arc-site"] || "Arc Site is not defined";
  const { authorSlug, feedOffset = 0, feedSize = 5 } = query;
  const args = `${authorSlug}&size=${feedSize}&from=${feedOffset}&website=${website}`;

  return `/content/v4/search/published?q=credits.by.slug:${args}&sort=display_date:desc`;
};

const resolve = query => {
  if (query.hasOwnProperty("authorSlug")) {
    return pattern(query);
  }

  throw new Error("authorSlug is required");
};

export default {
  params: {
    authorSlug: "text",
    feedSize: "number",
    feedOffset: "number"
  },
  resolve,
  schemaName: "content-api"
};
