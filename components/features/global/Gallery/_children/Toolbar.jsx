/* React */
import React from "react";
import PropTypes from "prop-types";

const Toolbar = props => {
  const toolBarButton = (action, icon, label, classes = "") => {
    return (
      <button
        className={`pointer ${classes}`}
        aria-label={label}
        tabIndex="0"
        onClick={action}
      >
        <span className="label | bold color_gray margin_right_1 pointer">
          {label}
        </span>
        <span className={`icon | ${icon} pointer`} />
      </button>
    );
  };

  const {
    autoplay,
    index,
    photoIndexDisplay,
    pressLeft,
    pressRight,
    toggleAutoplay,
    toggleLightbox
  } = props;

  return (
    <nav className="toolbar | display_flex row width_full">
      <span className="lightbox_toggle | display_flex pointer row">
        {toolBarButton(toggleLightbox, "fullscreen", "Full Screen")}
      </span>
      <span className="autoplay | display_flex pointer row">
        {toolBarButton(toggleAutoplay, "play", "Autoplay", "")}
        <span className={`spinner_container | ${autoplay}`}>
          <span className="spinner | display_inline_block" />
        </span>
      </span>

      <span className="photo_index | align_right bold margin_right_1">
        <span
          className={`bold ${
            index === 0 ? "color_gray" : "color_black"
          } arrow icon left small pointer`}
          onClick={pressLeft}
        />

        <span className="label | color_blue font_primary pointer">
          {photoIndexDisplay}
        </span>

        <span
          className="bold color_blue arrow icon right small pointer"
          onClick={pressRight}
        />
      </span>
    </nav>
  );
};

Toolbar.propTypes = {
  autoplay: PropTypes.bool,
  index: PropTypes.number,
  photoIndexDisplay: PropTypes.shape({}),
  pressLeft: PropTypes.func,
  pressRight: PropTypes.func,
  toggleAutoplay: PropTypes.func,
  toggleLightbox: PropTypes.func
};

export default Toolbar;
