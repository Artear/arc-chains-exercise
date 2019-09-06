/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
export function getWikipediaText(article) {
  const output = [];
  const paragraphs = /<p(.+?)p>/gim;

  article.replace(paragraphs, match => {
    const rawText = match.replace(/<sup(.+?)sup>/gim, "");
    output.push(rawText);
  }) || {};
  if (output.length === 0) {
    output.push(article);
  }
  return output;
}

export function getWikipediaImages(article) {
  const output = [];
  const images = new RegExp(
    "\\/\\/upload.wikimedia.org\\/\\S+\\.[jJ][pP][eE]?[gG]",
    "gi"
  );
  article.replace(images, match => {
    output.push(match);
  });
  return output;
}

export function createANSImageGallery(images) {
  const gallery = [];
  images.map((img, index) => {
    if (index % 3 === 2) {
      gallery.push({
        url: img,
        caption: "caption",
        credit: "https://wikipedia.org"
      });
    }
  });
  return gallery;
}

export function getWikipediaLinks(article, limit = 1) {
  let index = 0;
  const output = [];
  const links = new RegExp(/<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/gim);
  article.replace(links, match => {
    if (match.indexOf('class="external text"') >= 0 && index <= limit) {
      const link = document.createElement("a");
      link.innerHTML = match;
      const href = match.match(/href="([^"]*)/);
      output.push({
        text: link.innerText,
        url: href[1]
      });
      index += 1;
    }
  });
  return output;
}

export const populateWikipediaResults = results => {
  // eslint-disable-next-line no-useless-escape
  const wikiLink = /href="([\/wiki\/"]+)/g;
  const formattedWikiLinks = results.replace(
    wikiLink,
    'target="_blank" href="https://en.wikipedia.org/wiki/'
  );
  return formattedWikiLinks;
};

const getDeckText = text => {
  const deckText = [];
  if (text) {
    text.map((t, i) => {
      if (i > 0 && i < 3) {
        deckText.push(t);
      }
    });
  }
  return deckText.toString();
};

export const getWikipediaArticles = (searchTerms, component) => {
  const isObject = typeof searchTerms === "object";
  const length = isObject ? searchTerms.length - 1 : 0;
  const articles = [];
  for (let i = 0; i <= length; i += 1) {
    articles.push({
      term: `${
        isObject ? searchTerms[i].trim().replace(/ /g, "_") : searchTerms
      }`
    });
  }
  // eslint-disable-next-line no-loop-func
  articles.forEach((article, index) => {
    const { term } = article;
    component.fetchContent({
      data: {
        source: "wikipedia",
        query: { term },
        transform: results => {
          if (
            results &&
            results.parse &&
            results.parse.text &&
            results.parse.text["*"].length > 0
          ) {
            const articleText = results.parse.text["*"];
            const articleImages = getWikipediaImages(articleText);
            articles[index].data = populateWikipediaResults(articleText);
            articles[index].headlines = {
              basic: getWikipediaText(articleText)
                .toString()
                .substr(0, 150)
                .replace("(/", "")
                .replace("- ", "")
            };
            articles[index].description = {
              basic: getDeckText(getWikipediaText(articleText)).substr(0, 300)
            };
            articles[index].promo_items = {
              basic: {
                url: articleImages[0]
              }
            };
            articles[index].gallery = createANSImageGallery(articleImages);
            articles[index].taxonomy = {
              primary_section: {
                name: term
              }
            };
            return articles;
          }
        }
      }
    });
  });
};
