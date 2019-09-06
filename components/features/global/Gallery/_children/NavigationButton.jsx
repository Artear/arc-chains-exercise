/* React */
import React from "react";
import PropTypes from "prop-types";

const NavigationButton = props => {
  const { direction, onClick } = props;
  const isLeftButton = direction === "left";

  return (
    <button
      aria-label="change-photo"
      className={`navigation | ${
        isLeftButton ? "absolute" : "absolute_right"
      } background_transparent button container display_flex column height_full pointer width_half`}
      name={`${direction}`}
      onClick={onClick}
      tabIndex="0"
    >
      <span
        className={`color_gray large arrow icon ${direction} ${
          isLeftButton ? "absolute" : "absolute_right margin_right"
        }`}
      />
    </button>
  );
};

NavigationButton.propTypes = {
  direction: PropTypes.string,
  onClick: PropTypes.func
};

export default NavigationButton;
