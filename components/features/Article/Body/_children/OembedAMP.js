/* React */
import React from "react";
import PropTypes from "prop-types";

const OembedAMP = props => {
  const { subtype, rawOembed } = props;

  const { width, height, url } = rawOembed;

  switch (subtype) {
    case "facebook": {
      const widthRegex = /width="([0-9]+)"/;
      const heightRegex = /height="([0-9]+)"/;
      const urlRegex = /src\s*=\s*"([^"]+)"/;

      const widthFromRegex = widthRegex.exec(rawOembed.html);
      const heightFromRegex = heightRegex.exec(rawOembed.html);
      const urlFromRegex = urlRegex.exec(rawOembed.html);

      const oembedWidth = width || (widthFromRegex && widthFromRegex[1]) || 500;
      const oembedHeight =
        height || (heightFromRegex && heightFromRegex[1]) || 200;

      const oembedUrl =
        url || (urlFromRegex && urlRegex.exec(rawOembed.html)[1]);

      if (!oembedUrl) return null;

      return (
        <amp-facebook
          width={oembedWidth}
          height={oembedHeight}
          layout="responsive"
          data-href={oembedUrl}
        />
      );
    }
    case "facebook-post":
      return (
        <div>
          <amp-facebook
            width={rawOembed.width}
            height="310"
            layout="responsive"
            data-href={rawOembed.url}
          />
        </div>
      );
    case "facebook-video":
      return (
        <div>
          <amp-facebook
            width={rawOembed.width}
            height="310"
            layout="responsive"
            data-embed-as="video"
            data-href={rawOembed.url}
          />
        </div>
      );
    case "twitter": {
      const twitterRegex = /(https?:\/\/(www\.)?)?twitter\.com\/(\w*())\/?status?\/([0-9]*)?\/?/;
      const tweetId = rawOembed.html.match(twitterRegex)[5];
      return <amp-twitter width="375" height="472" data-tweetid={tweetId} />;
    }
    case "youtube": {
      const regExp = /embed\/([\w+\-+]+)["?]/;
      const youtubeId =
        rawOembed && rawOembed.html && rawOembed.html.match(regExp)[1];
      return (
        <amp-youtube
          data-videoid={youtubeId}
          layout="fixed"
          width="480"
          height="270"
        />
      );
    }
    case "instagram": {
      const instaRegex = /(https?:\/\/(www\.)?)?instagram\.com\/p\/(\w*([-'])?(\w*)?)/;
      const instaId =
        rawOembed && rawOembed.html && rawOembed.html.match(instaRegex);
      if (instaId && instaId[3]) {
        return (
          <amp-instagram
            data-shortcode={instaId[3]}
            data-captioned
            width="400"
            height="400"
            layout="fixed"
          />
        );
      }
      return null;
    }
    default:
      return null;
  }
};

OembedAMP.propTypes = {
  rawOembed: PropTypes.any,
  subtype: PropTypes.string
};

export default OembedAMP;
