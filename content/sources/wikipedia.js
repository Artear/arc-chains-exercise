/* eslint-disable no-prototype-builtins */
const resolve = query => {
  const requestUri = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=text|images`;

  if (query.hasOwnProperty("term")) return `${requestUri}&page=${query.term}`;

  throw new Error("Search term is required");
};

export default {
  resolve,
  params: {
    term: "text"
  }
};
