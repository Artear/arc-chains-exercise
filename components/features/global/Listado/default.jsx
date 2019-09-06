/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* React */
import React, { PureComponent } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import StoryFeed from "../StoryFeed/default";

/* Utilities */
import { feedLayouts } from "../StoryCard/_children/_configs";

@Consumer
class Listado extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    // if (!this.props.globalContent) {
    //   this.fetchContent({
    //     data: {
    //       source: "tn",
    //       query: {
    //         ID: "992165,992209,992225,992148,992124,992104,992082"
    //       }
    //     }
    //   });
    // }
  }

  render() {
    const data = this.props.globalContent; // || this.state.data;
    if (data && Object.getOwnPropertyNames(data).length > 0) {
      return (
        <StoryFeed
          data={data}
          customFields={{
            ...feedLayouts.listado
          }}
        />
      );
    }
    return null;
  }
}

Listado.propTypes = {
  globalContent: PropTypes.object
};

export default Listado;
