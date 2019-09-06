/* eslint-disable no-prototype-builtins */
const resolve = (query = {}) => {
  const serviceSite = query["arc-site"] || query.site;

  if (query.hasOwnProperty("hierarchy")) {
    const endpoint = `/site/v3/navigation/${serviceSite}/?hierarchy=${query.hierarchy ||
      "default"}`;
    return query.section ? `${endpoint}&_id=${query.section}` : endpoint;
  }

  throw new Error("hierarchy is required");
};

export default {
  resolve,
  params: {
    hierarchy: "text",
    section: "text"
  },
  schemaName: "site-service"
};
