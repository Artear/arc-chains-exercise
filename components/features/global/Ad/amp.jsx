/* React */
import React, { Component } from "react";

/* Components */
import ArcAd from "./default";

class AmpAd extends Component {
  render() {
    return <ArcAd isAmp={true} {...this.props} />;
  }
}

export default AmpAd;
