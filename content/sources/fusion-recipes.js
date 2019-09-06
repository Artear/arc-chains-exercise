const resolve = query => {
  const requestUri = `https://hltnxdp50k.execute-api.us-east-1.amazonaws.com/prod/fusion/documentation/${
    query.path
  }/${query.term}.md`;
  return requestUri;
};

export default {
  resolve,
  params: {
    path: "text",
    term: "text"
  },
  transform: data => {
    const output = data;
    if (data) {
      output.headlines.basic = data.content_elements[0].content;
      data.content_elements.shift();
      output.content_elements = data.content_elements;
    }
    return output;
  }
};
