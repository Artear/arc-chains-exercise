/* React */
import React, { Component, Fragment } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Utilities */
import determineElementsToRender from "./_children/_bodyElementRules";

// ToDo: Add ad body placement and showwordcount custom field rules
@Consumer
class ArticleBody extends Component {
  constructor(props) {
    super(props);
    if (Object.getOwnPropertyNames(props.globalContent).length === 0) {
      this.fetchContent({
        content: {
          source: "fusion-recipes",
          query: {
            term:
              (props.globalContentConfig &&
                props.globalContentConfig.query &&
                props.globalContentConfig.query.term) ||
              "fetching-content-with-hooks"
          }
        }
      });
    }
  }

  render() {
    const content =
      (this.state && this.state.content) || this.props.globalContent;
    if (content && Object.getOwnPropertyNames(content).length > 0) {
      const { siteProperties } = this.props;
      const { content_elements: contentElements } = content;

      const articleBodyElements = determineElementsToRender(
        contentElements,
        siteProperties,
        this.props
      );

      return articleBodyElements.map((bodyElement, index) => {
        return <Fragment key={`${index}`}>{bodyElement.element}</Fragment>;
      });
    }
    return null;
  }
}

ArticleBody.propTypes = {
  globalContent: PropTypes.object,
  globalContentConfig: PropTypes.object,
  siteProperties: PropTypes.object,
  customFields: PropTypes.shape({
    numberOfAds: PropTypes.number.tag({
      group: "Ads",
      name: "Number of Ads"
    }),
    afterWordCount: PropTypes.number.tag({
      group: "Ads",
      name: "After Word Count"
    }),
    minimumWordCount: PropTypes.number.tag({
      group: "Ads",
      name: "Minimum Article Word Count"
    }),
    showWordCount: PropTypes.bool.tag({
      defaultValue: false,
      group: "Ads",
      name: "Show Word Count"
    })
  })
};

export default ArticleBody;
