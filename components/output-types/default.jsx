/* React */
import React from "react";
import PropTypes from "prop-types";

/* Styles */
import "../features/global/StoryCard/styles/_alignment.scss";
import "../features/global/StoryCard/styles/_border.scss";
import "../features/global/StoryCard/styles/_colors.scss";
import "../features/global/StoryCard/styles/_dimensions.scss";
import "../features/global/StoryCard/styles/_display.scss";
import "../features/global/StoryCard/styles/_fonts.scss";
import "../features/global/StoryCard/styles/_gallery.scss";
import "../features/global/StoryCard/styles/_grid.scss";
import "../features/global/StoryCard/styles/_navbar.scss";
import "../features/global/StoryCard/styles/_resets.scss";
import "../features/global/StoryCard/styles/_spacers.scss";
import "../features/global/StoryCard/styles/_storyCard.scss";
import "../features/global/StoryCard/styles/_text.scss";

const OutputType = props => {
  const { arcSite = "the-prophet" } = props;

  return (
    <html>
      <head>
        <title>
          {props.metaValue("title") || props.siteProperties.defaultSiteTitle}
        </title>
        <props.MetaTags />
        <props.Libs />
        <props.CssLinks />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://s3.amazonaws.com/arc-subs-test/sdk/sdk-sales.min.js" />
        <script src="https://s3.amazonaws.com/arc-subs-test/sdk/sdk-identity.min.js" />
        <link
          rel="stylesheet"
          href={props.deployment(
            `${props.contextPath}/resources/dist/${arcSite}/css/style.css`
          )}
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=EB+Garamond:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
          rel="stylesheet"
        />
        <script
          src={props.deployment(
            `${props.contextPath}/resources/dist/${arcSite}/js/index.js`
          )}
        />
      </head>
      <body>
        <div id="fusion-app" className="fusion-app grid">
          {props.children}
        </div>
        <props.Fusion />
      </body>
    </html>
  );
};

export default OutputType;

OutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
  metaValue: PropTypes.func,
  siteProperties: PropTypes.object
};
