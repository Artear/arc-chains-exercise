/* React */
import React from "react";
import PropTypes from "prop-types";

const Photo = props => {
  return (
    <img
      className="photo | active display_inline_block height_full image_full width_full"
      alt={props.caption || "photo"}
      tabIndex="0"
      style={{ backgroundImage: `url('${props.src}')` }}
    />
  );
};

Photo.propTypes = {
  caption: PropTypes.string,
  src: PropTypes.string
};

export default Photo;
