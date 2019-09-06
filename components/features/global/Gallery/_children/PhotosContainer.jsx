/* React */
import React, { Component } from "react";
import PropTypes from "prop-types";

/* Components */
import Photo from "./Photo";
import { PhotoInfo } from "./PhotoInfo";

export class PhotosContainer extends Component {
  componentDidUpdate() {
    if (this.props.isLightboxOpen) {
      document.body.classList.add("overflow_hidden");
    } else {
      document.body.classList.remove("overflow_hidden");
    }
  }

  render() {
    const {
      currentPhoto,
      handleSwipe,
      isLightboxOpen,
      leftButton,
      nextPhoto,
      rightButton
    } = this.props;

    return (
      <figure className="photos | absolute height_full width_full">
        {leftButton()}
        {rightButton()}
        <div className="background_black height_full width_full">
          <Photo src={currentPhoto.url} onSwipe={handleSwipe} />
          <PhotoInfo
            currentPhoto={currentPhoto}
            isLightboxOpen={isLightboxOpen}
          />
        </div>
        {nextPhoto}
      </figure>
    );
  }
}

PhotosContainer.propTypes = {
  currentPhoto: PropTypes.shape({}),
  handleSwipe: PropTypes.func,
  isLightboxOpen: PropTypes.bool,
  leftButton: PropTypes.func,
  nextPhoto: PropTypes.shape({}),
  rightButton: PropTypes.func
};

export default PhotosContainer;
