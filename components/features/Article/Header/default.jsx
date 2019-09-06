/* React */
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import Byline from "../../global/Byline";
import Headline from "../../global/Headline";

/* Utilities */
import DateTimeInfo from "../../../utilities/DateTimeInfo";

@Consumer
class ArticleHeader extends PureComponent {
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
    const date = new Date();
    const dateTime = DateTimeInfo(date, true);

    if (content && Object.getOwnPropertyNames(content).length > 0) {
      return (
        <Fragment>
          <Headline
            headlinesContainerClasses="headline | bold font_tertiary"
            headlineText={content.headlines.basic}
            headlineLevel={1}
          />
          <Byline />
          <time className="datetime | font_primary">{dateTime}</time>
        </Fragment>
      );
    }
    return null;
  }
}

ArticleHeader.static = true;

ArticleHeader.propTypes = {
  globalContent: PropTypes.object,
  globalContentConfig: PropTypes.object
};

export default ArticleHeader;
