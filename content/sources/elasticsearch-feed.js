/* eslint-disable arrow-body-style */
export const itemsToArray = (itemString = "") => {
  return itemString.split(",").map(item => item.replace(/"/g, ""));
};

const pattern = (query = {}) => {
  const website = query["arc-site"] || "Arc Site is not defined.";
  const {
    excludeSections = "",
    feedOffset = 0,
    feedSize = 5,
    includeSections = ""
  } = query;

  const sectionsIncluded = itemsToArray(includeSections);
  const sectionsExcluded = itemsToArray(excludeSections);

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              "revision.published": "true"
            }
          },
          {
            nested: {
              path: "taxonomy.sections",
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        "taxonomy.sections._id": sectionsIncluded
                      }
                    },
                    {
                      term: {
                        "taxonomy.sections._website": website
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        must_not: [
          {
            nested: {
              path: "taxonomy.sections",
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        "taxonomy.sections._id": sectionsExcluded
                      }
                    },
                    {
                      term: {
                        "taxonomy.sections._website": website
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  };

  const encodedBody = encodeURI(JSON.stringify(body));

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc`;
};

const resolve = query => {
  if (query.excludeSections !== "" || query.includeSections !== "") {
    return pattern(query);
  }

  throw new Error("excludeSections or includeSections is required");
};

export default {
  resolve,
  schemaName: "content-feed",
  params: {
    includeSections: "text",
    excludeSections: "text",
    feedSize: "number",
    feedOffset: "number"
  }
};
