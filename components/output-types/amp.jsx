/* React */
import React from "react";
import PropTypes from "prop-types";

import {
  Html,
  BaseMarkup
} from "@arc-core-components/amp-document-boilerplate";

const AmpOutputType = props => {
  const { arcSite = "the-prophet" } = props;
  return (
    <Html>
      <head>
        <BaseMarkup canonicalUrl="/" />
        {/* add additional head elements here */}
        <script
          async
          custom-element="amp-sidebar"
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
        />
        <script
          async
          custom-element="amp-youtube"
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
        />
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
        />
        <script
          async
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
        <script
          async
          custom-element="amp-twitter"
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
        />
        <script
          async
          custom-element="amp-instagram"
          src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
        />
        <script
          async
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
        />
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />
        <props.Resource path={`resources/dist/${arcSite}/css/style.css`}>
          {({ data }) => {
            return data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={{
                  __html: `${data}`
                }}
              />
            ) : null;
          }}
        </props.Resource>
      </head>
      <body>{props.children}</body>
    </Html>
  );
};

// If no amp.jsx file exists, this feature will not render.
AmpOutputType.fallback = false;

AmpOutputType.propTypes = {
  children: PropTypes.node,
  arcSite: PropTypes.string
};

export default AmpOutputType;
