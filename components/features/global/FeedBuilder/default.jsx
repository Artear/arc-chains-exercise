/* React */
import React, { Fragment, PureComponent } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import StoryFeed from "../StoryFeed/default";
import TitleBar from "../TitleBar/default";

/* Utilities */
import {
  defaultTerms,
  feedColorPalettes,
  feedColorPaletteKeys,
  feedLayouts,
  feedLayoutKeys
} from "../StoryCard/_children/_configs";
import { getWikipediaArticles } from "../../../utilities/Wikipedia";

@Consumer
class FeedBuilder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.terms =
      (props.customFields.content && props.customFields.content.split(",")) ||
      defaultTerms;
    getWikipediaArticles(this.terms, this);
  }

  render() {
    const { data } = this.state;
    const { colorPalette, layout, lazyLoad, title } = this.props.customFields;
    if (data && Object.getOwnPropertyNames(data).length > 0) {
      return (
        <Fragment>
          <TitleBar
            title={title}
            titleBarColor="black"
            titleBarType="ruler"
            titleBarTextTransform="uppercase"
            titleFontSize={22}
          />
          <StoryFeed
            data={data}
            customFields={{
              ...feedColorPalettes[colorPalette],
              ...feedLayouts[layout],
              ...{
                lazyLoad
              }
            }}
          />
        </Fragment>
      );
    }
    return null;
  }
}

FeedBuilder.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: "Title"
    }),
    content: PropTypes.string.tag({
      name: "Content Source"
    }),
    layout: PropTypes.oneOf(feedLayoutKeys).tag({
      name: "Layout"
    }),
    colorPalette: PropTypes.oneOf(feedColorPaletteKeys).tag({
      name: "Color Palette"
    }),
    lazyLoad: PropTypes.bool.tag({
      defaultValue: false,
      name: "Lazy Load Cards"
    })
  })
};

export default FeedBuilder;
