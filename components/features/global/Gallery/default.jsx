/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* React */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import NavigationButton from "./_children/NavigationButton";
import { PhotosContainer } from "./_children/PhotosContainer";
import Toolbar from "./_children/Toolbar";

/* Utilities */
import { getWikipediaArticles } from "../../../utilities/Wikipedia";

@Consumer
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.autoPlayTimer = null;
    this.state = {
      autoplay: false,
      currentPhoto: undefined,
      data: [],
      index: 0,
      isLightboxOpen: false
    };
    if (!props.data) {
      getWikipediaArticles("newspaper", this);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.autoplay) {
      window.clearInterval(this.autoPlayTimer);
    } else if (
      this.state.autoplay &&
      !prevState.autoplay &&
      this.state.index < this.state.data[0].gallery.length
    ) {
      const gallery = this;
      this.autoPlayTimer = setInterval(() => {
        gallery.pressRight();
      }, 4000);
    }
  }

  onKeyPress = (e = window.event) => {
    if (this.state.isLightboxOpen) {
      if (e.keyCode === "37") {
        this.pressLeft();
      } else if (e.keyCode === "39" || e.keyCode === "13") {
        this.pressRight();
      }
    }
  };

  toggleAutoplay = () => {
    if (this.state.index === this.state.data[0].gallery.length - 1) {
      this.setState({
        autoplay: true,
        index: 0,
        currentPhoto: this.state.data[0].gallery[0]
      });
    } else {
      this.setState({
        autoplay: !this.state.autoplay
      });
    }
  };

  toggleLightbox = () => {
    this.setState({
      isLightboxOpen: !this.state.isLightboxOpen
    });
  };

  changePhoto = newIndex => {
    if (newIndex < this.state.data[0].gallery.length) {
      this.setState({
        index: newIndex,
        currentPhoto: this.state.data[0].gallery[newIndex]
      });
    } else if (this.state.autoplay) {
      window.clearInterval(this.autoPlayTimer);
      this.setState({
        autoplay: false
      });
    } else {
      this.setState({
        index: 0,
        currentPhoto: this.state.data[0].gallery[0]
      });
    }
  };

  showLeftNavigationButton = () => {
    return this.state.index > 0;
  };

  showRightNavigationButton = () => {
    const maxLength =
      this.state.data[0].gallery.length - (this.state.isLightboxOpen ? 0 : -1);
    return this.state.index < maxLength;
  };

  pressLeft = () => {
    this.changePhoto(Math.max(this.state.index - 1, 0));
  };

  pressRight = () => {
    const maxLength =
      this.state.data[0].gallery.length - (this.state.isLightboxOpen ? 0 : -1);
    this.changePhoto(Math.min(this.state.index + 1, maxLength));
  };

  handleSwipe = direction => {
    return direction === "right" ? this.pressLeft() : this.pressRight();
  };

  photoIndexDisplay = () => {
    const photos = this.state.data[0].gallery.length;
    const { index } = this.state;
    return (
      <Fragment>
        <span>{index + (index === photos ? 0 : 1)}</span>
        <span className="margin_left_half color_gray">/ {photos}</span>
      </Fragment>
    );
  };

  preloadNextPhoto = () => {
    const newIndex = this.state.index + 1;
    const nextPhoto = this.state.data[0].gallery[newIndex] || {};

    return <img src={nextPhoto.url} className="photo | hidden transparent" />;
  };

  render() {
    const data =
      this.props.data || (this.state.data && this.state.data[0].gallery);
    if (data && Object.getOwnPropertyNames(data).length > 0) {
      const photosContainerProps = {
        currentPhoto: this.state.currentPhoto || this.state.data[0].gallery[0],
        handleSwipe: this.handleSwipe,
        isLightboxOpen: this.state.isLightboxOpen,
        leftButton: () => {
          return (
            this.showLeftNavigationButton() && (
              <NavigationButton direction="left" onClick={this.pressLeft} />
            )
          );
        },
        nextPhoto: this.preloadNextPhoto(),
        rightButton: () => {
          return (
            this.showRightNavigationButton() && (
              <NavigationButton direction="right" onClick={this.pressRight} />
            )
          );
        }
      };

      const containerClasses = this.state.isLightboxOpen
        ? "lightbox fixed foreground fullscreen height_full overflow_hidden width_full"
        : "relative";

      return (
        <Fragment>
          <div
            className={`gallery | ${containerClasses} height_full width_full`}
            onKeyDown={this.onKeyPress}
            tabIndex="0"
          >
            {this.state.isLightboxOpen ? (
              <button
                className="absolute_right color_gray foreground padding_horizontal pointer"
                aria-label="close-lightbox"
                onClick={this.toggleLightbox}
                tabIndex="0"
              >
                <span className="bold close">x</span>
              </button>
            ) : (
              <Toolbar
                autoplay={this.state.autoplay}
                index={this.state.index}
                photoCount={this.state.data[0].gallery.length}
                photoIndexDisplay={this.photoIndexDisplay()}
                pressLeft={this.pressLeft}
                pressRight={this.pressRight}
                toggleAutoplay={this.toggleAutoplay}
                toggleLightbox={this.toggleLightbox}
              />
            )}
            <PhotosContainer {...photosContainerProps} />
          </div>
        </Fragment>
      );
    }
    return null;
  }
}

Gallery.propTypes = {
  data: PropTypes.array
};

export default Gallery;
