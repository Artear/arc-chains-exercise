/* React */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class PhotoInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleCaption = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { currentPhoto, isLightboxOpen } = this.props;

    return (
      <figcaption
        onClick={this.toggleCaption}
        className={`caption | absolute pointer width_full ${
          this.state.expanded
        }`}
      >
        <span
          className={`bold color_gray container display_flex row ${
            isLightboxOpen ? "" : "hidden"
          }`}
        >
          <span>Caption</span>
          <span
            className={`arrow icon small margin_left_1 ${
              this.state.expanded ? "up" : "down"
            }`}
          />
        </span>
        <span
          className={`${
            isLightboxOpen ? "color_white" : "color_black"
          } container display_flex row`}
        >
          {currentPhoto.caption}
        </span>
      </figcaption>
    );
  }
}

PhotoInfo.propTypes = {
  currentPhoto: PropTypes.shape({}),
  isLightboxOpen: PropTypes.bool
};

export default PhotoInfo;
