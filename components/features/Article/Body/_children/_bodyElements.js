/* React */
import React, { Fragment } from "react";

/* Components */
import { Blockquote } from "./BlockQuote";
import OembedAMP from "./OembedAMP";
import Text from "./Text";
import Headlines from "../../../global/Headline";
import Image from "../../../global/Image";
import List from "../../../global/List";
import RawHTML from "../../../global/RawHtml/default";

const bodyElements = (element, pageType, props) => {
  const isAmp = pageType === "amp";
  switch (element.type) {
    case "blockquote":
      return (
        <Blockquote
          classes="blockquote"
          text={element.content}
          type="blockquote"
        />
      );
    case "text":
      return <Text classes="paragraph" content={element.content} />;
    case "header":
      return (
        <Headlines
          headlinesContainerClasses="header |"
          headlineText={element.content}
          level={element.level}
        />
      );
    case "list":
      return (
        <List
          classes="list"
          items={element.items}
          listType={element.list_type}
        />
      );
    case "raw_html":
      return isAmp ? null : (
        <RawHTML
          classes={element.type}
          content={element.content}
          id={element._id}
        />
      );
    case "oembed_response":
      return isAmp ? (
        <OembedAMP rawOembed={element.content} subtype={element.type} />
      ) : null;
    case "image":
      return isAmp ? (
        <Image {...props} ImgTag="amp-img" />
      ) : (
        <Image {...props} />
      );
    default:
      return <Fragment />;
  }
};

export default bodyElements;
