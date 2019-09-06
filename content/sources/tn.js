/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
const resolve = query => {
  const requestUri = `https://api-front.tn.com.ar/articles/?id=${query.ID}`;
  if (query.hasOwnProperty("ID")) return requestUri;
  throw new Error("ID is required");
};

export default {
  resolve,
  params: {
    ID: "text"
  },
  transform: data => {
    const articles = [];
    if (data && data.length > 0) {
      for (let i = 0; i <= data.length - 1; i += 1) {
        articles.push({
          data: data[i].articleId
        });
      }
      data.map((val, index) => {
        articles[index].headlines = {
          basic: val.content.title.headline
        };
        articles[index].description = {
          basic: val.content.dropline[0].content
        };
        articles[index].promo_items = {
          basic: {
            url: val.content.media[0].source.value
          }
        };
        articles[index].taxonomy = {
          primary_section: {
            name: val.content.section.name
          }
        };
      });
      return articles;
    }
  }
};
