/* React */
import React, { PureComponent } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import StoryFeed from "../StoryFeed/default";
import TitleBar from "../TitleBar/default";

/* Utilities */
import {
  defaultProfiles,
  feedColorPalettes,
  feedLayouts
} from "../StoryCard/_children/_configs";
import { getWikipediaArticles } from "../../../utilities/Wikipedia";

@Consumer
class Profiles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.terms =
      (props.customFields.content && props.customFields.content.split(",")) ||
      defaultProfiles;
    getWikipediaArticles(this.terms, this);
  }

  render() {
    const { data } = this.state;
    const { title } = this.props.customFields;
    if (data && Object.getOwnPropertyNames(data).length > 0) {
      return (
        <div className="profiles | width_full">
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
              ...feedColorPalettes.blue,
              ...feedLayouts.profile
            }}
          />
        </div>
      );
    }
    return null;
  }
}

Profiles.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: "Title"
    }),
    content: PropTypes.string.tag({
      name: "Content Source"
    })
  })
};

export default Profiles;
